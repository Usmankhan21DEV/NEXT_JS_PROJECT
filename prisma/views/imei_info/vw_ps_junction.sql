SELECT
  `psj`.`SEQ_NUM` AS `SEQ_NUM`,
  `p`.`Name` AS `PACKAGE_NAME`,
  `s`.`Name` AS `SERVICE_NAME`,
  `psj`.`COST` AS `COST`,
  `psj`.`CREATE_DATE` AS `CREATED_DATE`,
  `psj`.`PACKAGE_SEQ_NUM` AS `PACKAGE_SEQ_NUM`,
  `psj`.`SERVICE_SEQ_NUM` AS `SERVICE_SEQ_NUM`
FROM
  (
    (
      `imei_info`.`package_service_junction` `psj`
      LEFT JOIN `imei_info`.`services` `s` ON((`psj`.`SERVICE_SEQ_NUM` = `s`.`SEQ_NUM`))
    )
    LEFT JOIN `imei_info`.`packages` `p` ON((`p`.`SEQ_NUM` = `psj`.`PACKAGE_SEQ_NUM`))
  )