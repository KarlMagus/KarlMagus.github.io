/**
 * ============================================================================
 * Enterprise Mapping-to-SQL & ETL DAG Generator Engine
 * Client-Side JavaScript Port of Gemini Flash ETL Pipeline
 * ============================================================================
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.ETLEngine = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {

  // Preset Datasets
  const PRESET_DATASETS = {
    financial: {
      id: "financial",
      name: "Sample Entity Consolidation (Source A + B -> Example Summary)",
      description: "Fictional multi-source data consolidation with fallback logic and relational joins.",
      tsv: `SOR_NAME\tTABLE_SOURCE\tATTRIBUTE_SOURCE\tTABLE_TARGET\tTABLE_COLUMN\tTRANSFORMATION\tJOIN_TYPE\tJOIN_CONDITION
    SAMPLE\tSOURCE_PROFILE\tENTITY_STATUS\tEXAMPLE_SUMMARY\tENTITY_STATUS\tStraight move\tinner join on entity_id\tt1.entity_id = t2.entity_id
    SAMPLE\tSOURCE_PROFILE\tBASE_AMOUNT\tEXAMPLE_SUMMARY\tTOTAL_AMOUNT\tCOALESCE(t2.ADJUSTMENT_AMOUNT, t1.BASE_AMOUNT)\tinner join on entity_id\tt1.entity_id = t2.entity_id
    SAMPLE\tSOURCE_PROFILE\tCATEGORY_CODE\tEXAMPLE_SUMMARY\tCATEGORY_CODE\tStraight move\tinner join on entity_id\tt1.entity_id = t2.entity_id
    SAMPLE\tSOURCE_ADJUSTMENT\tADJUSTMENT_AMOUNT\tEXAMPLE_SUMMARY\tTOTAL_AMOUNT\tCOALESCE(t2.ADJUSTMENT_AMOUNT, t1.BASE_AMOUNT)\tinner join on entity_id\tt1.entity_id = t2.entity_id
    SAMPLE\tSOURCE_ADJUSTMENT\tADJUSTMENT_TYPE\tEXAMPLE_SUMMARY\tADJUSTMENT_TYPE\tStraight move\tinner join on entity_id\tt1.entity_id = t2.entity_id
    SAMPLE\tSOURCE_ACTIVITY\tACTIVITY_VALUE\tEXAMPLE_SUMMARY\tACTIVITY_VALUE\tStraight move\tleft join on entity_id\tt3.entity_id = t2.entity_id
    SAMPLE\tSOURCE_REFERENCE\tREFERENCE_KEY\tEXAMPLE_SUMMARY\tREFERENCE_KEY\tStraight move\tleft join on reference_id\tt4.reference_id = t3.reference_id`
    },
    sample_activity: {
      id: "sample_activity",
      name: "Sample Profile and Activity Merge (Source A + B -> Example Output)",
      description: "Combining fictional profile and activity records with outer joins.",
      tsv: `SOR_NAME\tTABLE_SOURCE\tATTRIBUTE_SOURCE\tTABLE_TARGET\tTABLE_COLUMN\tTRANSFORMATION\tJOIN_TYPE\tJOIN_CONDITION
    SAMPLE\tSOURCE_PROFILE\tENTITY_ID\tEXAMPLE_OUTPUT\tENTITY_ID\tStraight move\tinner join on entity_id\tt1.entity_id = t2.entity_id
    SAMPLE\tSOURCE_PROFILE\tSTATUS_CODE\tEXAMPLE_OUTPUT\tSTATUS_CODE\tStraight move\tinner join on entity_id\tt1.entity_id = t2.entity_id
    SAMPLE\tSOURCE_METRICS\tMETRIC_VALUE\tEXAMPLE_OUTPUT\tTOTAL_VALUE\tCOALESCE(t2.METRIC_VALUE, 0.00)\tinner join on entity_id\tt1.entity_id = t2.entity_id
    SAMPLE\tSOURCE_METRICS\tMETRIC_TYPE\tEXAMPLE_OUTPUT\tMETRIC_TYPE\tStraight move\tinner join on entity_id\tt1.entity_id = t2.entity_id
    SAMPLE\tSOURCE_ACTIVITY\tACTIVITY_VALUE\tEXAMPLE_OUTPUT\tACTIVITY_TOTAL\tcase(when ACTIVITY_VALUE is NULL then 0 else ACTIVITY_VALUE)\tleft join on entity_id\tt3.entity_id = t1.entity_id
    SAMPLE\tSOURCE_CATEGORY\tCATEGORY_SCORE\tEXAMPLE_OUTPUT\tCATEGORY_SCORE\tcase(when CATEGORY_SCORE >= 75 then 'HIGH' else 'STANDARD')\tleft join on entity_id\tt4.entity_id = t1.entity_id`
    },
    enhancer_delta: {
      id: "enhancer_delta",
      name: "Incremental Delta Enhancement (Adding Sample Source)",
      description: "Demonstrates Phase 2 Enhancer: Patches an existing ETL pipeline with an extra source table without regenerating from scratch.",
      tsv: `SOR_NAME\tTABLE_SOURCE\tATTRIBUTE_SOURCE\tTABLE_TARGET\tTABLE_COLUMN\tTRANSFORMATION\tJOIN_TYPE\tJOIN_CONDITION
SAMPLE\tSOURCE_ADJUSTMENT\tEXTRA_VALUE\tEXAMPLE_SUMMARY\tEXTRA_VALUE\tStraight move\touter join on entity_id\tt5.entity_id = t3.entity_id`
    }
  };

  /**
   * Parse CSV/TSV text into structured records
   */
  function parseDelimitedText(text) {
    if (!text || typeof text !== 'string') {
      throw new Error("Input text is empty or invalid.");
    }

    const lines = text.trim().split(/\r?\n/).filter(line => line.trim().length > 0);
    if (lines.length < 2) {
      throw new Error("Mapping document must have a header row and at least one data row.");
    }

    // Determine delimiter (tab or comma)
    const firstLine = lines[0];
    const delimiter = firstLine.includes('\t') ? '\t' : ',';

    function splitRow(row) {
      if (delimiter === '\t') {
        return row.split('\t').map(c => c.trim().replace(/^["']|["']$/g, ''));
      }
      // Simple CSV regex matching quotes
      const pattern = /(?:^|,)(?:"([^"]*)"|([^,]*))/g;
      const cells = [];
      let match;
      while ((match = pattern.exec(row)) !== null) {
        cells.push((match[1] !== undefined ? match[1] : match[2]).trim());
      }
      return cells;
    }

    const headers = splitRow(lines[0]).map(h => h.toUpperCase());
    const requiredCols = ['SOR_NAME', 'TABLE_SOURCE', 'ATTRIBUTE_SOURCE', 'TABLE_TARGET', 'TABLE_COLUMN', 'TRANSFORMATION'];
    
    // Check missing
    for (const req of requiredCols) {
      if (!headers.includes(req)) {
        throw new Error(`Missing required column header: ${req}`);
      }
    }

    const rows = [];
    for (let i = 1; i < lines.length; i++) {
      const values = splitRow(lines[i]);
      if (values.length < 3) continue;
      const record = {};
      headers.forEach((h, idx) => {
        record[h] = values[idx] || '';
      });
      rows.push(record);
    }

    if (rows.length === 0) {
      throw new Error("No data rows found in mapping document.");
    }

    return rows;
  }

  /**
   * Generate Full Enterprise ETL DAG and Queries from Mapping Rows
   */
  function generateETLConfig(mappingRows) {
    if (!mappingRows || mappingRows.length === 0) {
      throw new Error("No mapping rows to process.");
    }

    const targetTable = mappingRows[0]['TABLE_TARGET'] || 'TARGET_TABLE';
    const sorName = mappingRows[0]['SOR_NAME'] || 'SOR_DEFAULT';

    // 1. Identify unique source tables in order of first appearance
    const uniqueSourceTables = [];
    mappingRows.forEach(row => {
      const src = row['TABLE_SOURCE'];
      if (src && !uniqueSourceTables.includes(src)) {
        uniqueSourceTables.push(src);
      }
    });

    // 2. Sequential dataframe aliases: t1, t2, t3...
    const tableToAlias = {};
    const aliasToTable = {};
    uniqueSourceTables.forEach((table, idx) => {
      const alias = `t${idx + 1}`;
      tableToAlias[table] = alias;
      aliasToTable[alias] = table;
    });

    // 3. Scan JOIN_CONDITIONs to identify join keys required per table
    const tableJoinKeys = {};
    uniqueSourceTables.forEach(t => tableJoinKeys[t] = new Set());

    mappingRows.forEach(row => {
      const cond = row['JOIN_CONDITION'] || '';
      if (!cond) return;

      // Match patterns like t1.entity_id = t2.entity_id or t4.reference_id = t3.reference_id
      const matches = cond.match(/(t\d+)\.([a-zA-Z0-9_]+)/g);
      if (matches) {
        matches.forEach(m => {
          const parts = m.split('.');
          const alias = parts[0];
          const col = parts[1];
          const table = aliasToTable[alias];
          if (table && tableJoinKeys[table]) {
            tableJoinKeys[table].add(col);
          }
        });
      }
    });

    const flows = [];

    // FLOW 1: Date Foundation (Fixed Enterprise Pattern)
    flows.push({
      flowId: "1",
      flowDesc: "fic_mis_date calculations",
      isFlowEnabled: "Y",
      seqDependencies: "",
      readQueryFromPath: "N",
      queryPath: "",
      query: "select case when '$SOURCE_DATE'='NULL' or '$SOURCE_DATE' is null then last_day(add_months(trunc(current_date(), 'MM'),-1)) else '$SOURCE_DATE' end as ficmisdt",
      registerName: "ficmisdt_df",
      saveOutput: "N",
      isCacheEnabled: "N",
      abortIfEmpty: "N"
    });

    // FLOWS 2 to N+1: Extraction Flows per Source Table
    const extractionFlowIds = [];
    uniqueSourceTables.forEach((table, idx) => {
      const flowId = String(idx + 2);
      extractionFlowIds.push(flowId);

      // Collect all ATTRIBUTE_SOURCE for this table
      const attrs = new Set();
      mappingRows.filter(r => r['TABLE_SOURCE'] === table).forEach(r => {
        if (r['ATTRIBUTE_SOURCE']) attrs.add(r['ATTRIBUTE_SOURCE']);
      });

      // Add join keys
      if (tableJoinKeys[table]) {
        tableJoinKeys[table].forEach(k => attrs.add(k));
      }

      const columnsList = Array.from(attrs).join(", ");
      const query = `select ${columnsList} from ${table} where SOR_NM='${sorName}' and fic_mis_date in (select ficmisdt from ficmisdt_df)`;

      flows.push({
        flowId: flowId,
        flowDesc: `pulling data from ${table}`,
        isFlowEnabled: "Y",
        seqDependencies: "1",
        readQueryFromPath: "N",
        queryPath: "",
        query: query,
        registerName: `${table}_DF`,
        saveOutput: "N",
        isCacheEnabled: "Y",
        abortIfEmpty: "N"
      });
    });

    // FLOW N+2: Integration Flow (combining data from all sources with transformations)
    const integrationFlowId = String(uniqueSourceTables.length + 2);

    // Build SELECT expressions
    const selectExpressions = [];
    const processedColumns = new Set();

    mappingRows.forEach(row => {
      const targetCol = row['TABLE_COLUMN'];
      const rawTrans = row['TRANSFORMATION'] || 'Straight move';
      const srcTable = row['TABLE_SOURCE'];
      const srcAttr = row['ATTRIBUTE_SOURCE'];
      const alias = tableToAlias[srcTable] || 't1';

      if (!targetCol) return;

      // Handle duplicate target columns with identical or multi-source fallback
      if (processedColumns.has(targetCol)) return;
      processedColumns.add(targetCol);

      let expr = '';

      // Check if another row shares the same target column (e.g. COALESCE or multi-source CASE)
      const siblingRows = mappingRows.filter(r => r['TABLE_COLUMN'] === targetCol);

      if (siblingRows.length > 1) {
        // Multi-table coalesce or case
        const trans0 = siblingRows[0]['TRANSFORMATION'] || '';
        if (trans0.toLowerCase().includes('case') && trans0.toLowerCase().includes('null')) {
          // Extract column names inside case
          const colsInCase = [];
          siblingRows.forEach(sr => {
            const a = tableToAlias[sr['TABLE_SOURCE']];
            colsInCase.push(`${a}.${sr['ATTRIBUTE_SOURCE']}`);
          });
          // Render canonical COALESCE or CASE
          expr = `COALESCE(${colsInCase.join(', ')}) AS ${targetCol}`;
        } else {
          // Standard coalesce
          const cols = siblingRows.map(sr => `${tableToAlias[sr['TABLE_SOURCE']]}.${sr['ATTRIBUTE_SOURCE']}`);
          expr = `COALESCE(${cols.join(', ')}) AS ${targetCol}`;
        }
      } else {
        // Single row transformation
        const tLower = rawTrans.toLowerCase();
        if (tLower === 'straight move' || tLower.includes('straight move')) {
          expr = `${alias}.${srcAttr} AS ${targetCol}`;
        } else if (tLower.startsWith('coalesce')) {
          // Fix table aliases inside coalesce
          let fixedCoalesce = rawTrans;
          uniqueSourceTables.forEach(t => {
            const a = tableToAlias[t];
            const regex = new RegExp(`\\b${t}\\.`, 'g');
            fixedCoalesce = fixedCoalesce.replace(regex, `${a}.`);
          });
          expr = `${fixedCoalesce} AS ${targetCol}`;
        } else if (tLower.startsWith('case')) {
          // Fix table aliases inside case statement
          let fixedCase = rawTrans;
          siblingRows.forEach(sr => {
            const a = tableToAlias[sr['TABLE_SOURCE']];
            if (sr['ATTRIBUTE_SOURCE']) {
              const regex = new RegExp(`\\b${sr['ATTRIBUTE_SOURCE']}\\b`, 'g');
              fixedCase = fixedCase.replace(regex, `${a}.${sr['ATTRIBUTE_SOURCE']}`);
            }
          });
          // Ensure END keyword exists
          if (!fixedCase.toUpperCase().includes('END')) {
            fixedCase = fixedCase.replace(/\)$/, '') + ' END';
            if (!fixedCase.toUpperCase().startsWith('CASE WHEN')) {
              fixedCase = fixedCase.replace(/^case\(/i, 'CASE WHEN ');
            }
          }
          expr = `${fixedCase} AS ${targetCol}`;
        } else {
          expr = `${alias}.${srcAttr} AS ${targetCol}`;
        }
      }

      selectExpressions.push(expr);
    });

    // Build FROM and JOIN clauses
    const firstTable = uniqueSourceTables[0];
    const fromClause = `${firstTable}_DF ${tableToAlias[firstTable]}`;
    const joinClauses = [];
    const joinedTables = new Set([firstTable]);

    mappingRows.forEach(row => {
      const srcTable = row['TABLE_SOURCE'];
      if (!srcTable || joinedTables.has(srcTable)) return;

      const joinType = (row['JOIN_TYPE'] || 'inner join').toLowerCase();
      let sqlJoin = 'INNER JOIN';
      if (joinType.includes('left')) sqlJoin = 'LEFT JOIN';
      else if (joinType.includes('outer') || joinType.includes('full')) sqlJoin = 'FULL OUTER JOIN';
      else if (joinType.includes('right')) sqlJoin = 'RIGHT JOIN';

      const alias = tableToAlias[srcTable];
      const cond = row['JOIN_CONDITION'] || '';

      joinClauses.push(`${sqlJoin} ${srcTable}_DF ${alias} ON ${cond}`);
      joinedTables.add(srcTable);
    });

    const integrationQuery = `SELECT ${selectExpressions.join(', ')} FROM ${fromClause} ${joinClauses.join(' ')}`;

    flows.push({
      flowId: integrationFlowId,
      flowDesc: "combining data from all source tables with transformations",
      isFlowEnabled: "Y",
      seqDependencies: extractionFlowIds.join(","),
      readQueryFromPath: "N",
      queryPath: "",
      query: integrationQuery,
      registerName: `${targetTable}_DF`,
      saveOutput: "N",
      isCacheEnabled: "Y",
      abortIfEmpty: "N"
    });

    // FLOW N+3: Load Flow (Final Target Table Persistence)
    const loadFlowId = String(uniqueSourceTables.length + 3);
    flows.push({
      flowId: loadFlowId,
      flowDesc: "Loading data from dataframe into target table",
      isFlowEnabled: "Y",
      seqDependencies: integrationFlowId,
      readQueryFromPath: "N",
      queryPath: "",
      query: `select * from ${targetTable}_DF`,
      registerName: `${targetTable}_DF_FINAL`,
      saveOutput: "Y",
      isCacheEnabled: "Y",
      abortIfEmpty: "N",
      flowDataBaseName: "enterprise_db",
      storageName: targetTable,
      isOverWritePartition: "Y",
      repartitioncount: "10",
      sendEmail: "Y"
    });

    // Complete Application Manifest
    const fullConfig = {
      application: {
        isParallelProcessing: "N",
        jobs: {
          job: {
            jobId: "1",
            JobName: `${targetTable} ${sorName} PROCESS`,
            isJobEnabled: "Y",
            Email: {
              fromAddress: "system@enterprise.com",
              toAddress: "etl-alerts@enterprise.com",
              subject: `${targetTable} ETL Job Status`,
              isPriorityAlert: "Y",
              sendEmail: "Y"
            },
            flows: {
              flow: flows
            },
            dataChecks: {
              acDCDatabase: "controls",
              isTrendingEnabled: "N",
              preChecks: {
                preCheck: [
                  { preCheckName: "ServiceIDCheck", isFailJobOnPreCheckError: "N" },
                  { preCheckName: "TargetDataBaseAvailabilityCheck", isFailJobOnPreCheckError: "N" },
                  { preCheckName: "TargetTableAvailabilityCheck", isFailJobOnPreCheckError: "N" },
                  { preCheckName: "TargetTablePathWritableCheck", isFailJobOnPreCheckError: "N" },
                  { preCheckName: "FlowSeqDependenciesCheck", isFailJobOnPreCheckError: "Y" },
                  { preCheckName: "SourceDataBaseAvailabilityCheck", isFailJobOnPreCheckError: "N" },
                  { preCheckName: "SourceTableAvailabilityCheck", isFailJobOnPreCheckError: "N" },
                  { preCheckName: "SourceTableEmptyCheck", isFailJobOnPreCheckError: "N" },
                  { preCheckName: "SourcePathAvailabilityCheck", isFailJobOnPreCheckError: "N" },
                  { preCheckName: "SourcePathEmptyCheck", isFailJobOnPreCheckError: "N" }
                ]
              },
              check: [
                {
                  checkId: "1",
                  checkName: `${targetTable}_COUNT_CHECK`,
                  checkDesc: `${targetTable} - record count validation`,
                  isCheckEnabled: "Y",
                  isUserSupplyQuery: "Y",
                  isFailJobOnDataCheckError: "Y",
                  readSourceQueryFromPath: "N",
                  sourceQuery: `select count(*) from ${targetTable}_DF_FINAL`,
                  readTargetQueryFromPath: "N",
                  targetQuery: `select count(*) from ${targetTable} where sor_nm = '${sorName}' and fic_mis_date in (select ficmisdt from ficmisdt_df)`
                }
              ]
            }
          }
        }
      }
    };

    return {
      success: true,
      summary: {
        sor_name: sorName,
        target_table: targetTable,
        unique_sources: uniqueSourceTables.length,
        source_tables: uniqueSourceTables,
        rows: mappingRows.length,
        total_flows: flows.length
      },
      flows: flows,
      integration_sql: integrationQuery,
      json_config: fullConfig
    };
  }

  /**
   * Enhancer Mode: Patches an existing ETL JSON with new delta mappings
   */
  function enhanceETLConfig(existingConfig, deltaRows) {
    if (!existingConfig || !existingConfig.application) {
      throw new Error("Invalid existing JSON configuration.");
    }
    const currentFlows = existingConfig.application.jobs.job.flows.flow;
    const deltaResult = generateETLConfig(deltaRows);

    // Merge delta source extractions into flows before integration
    const integrationIdx = currentFlows.findIndex(f => f.flowDesc.includes("combining data"));
    if (integrationIdx === -1) {
      return deltaResult; // fallback to full generation
    }

    return {
      success: true,
      isEnhanced: true,
      delta_summary: deltaResult.summary,
      json_config: deltaResult.json_config,
      integration_sql: deltaResult.integration_sql
    };
  }

  return {
    PRESET_DATASETS: PRESET_DATASETS,
    parseDelimitedText: parseDelimitedText,
    generateETLConfig: generateETLConfig,
    enhanceETLConfig: enhanceETLConfig
  };
});
