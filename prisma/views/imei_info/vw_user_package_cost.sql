SELECT
  `imei_info`.`user_balance`.`SEQ_NUM` AS `SEQ_NUM`,
  `imei_info`.`user_balance`.`USER_SEQ_NUM` AS `USER_SEQ_NUM`,
  `imei_info`.`user_balance`.`BALANCE` AS `BALANCE`,
  `imei_info`.`user_balance`.`Package_SEQ_NUM` AS `PACKAGE_SEQ_NUM`,
  `imei_info`.`package_service_junction`.`SERVICE_SEQ_NUM` AS `SERVICE_SEQ_NUM`,
  `imei_info`.`package_service_junction`.`SEQ_NUM` AS `PSJ_SEQ_NUM`,
  `imei_info`.`package_service_junction`.`COST` AS `COST`,
  `imei_info`.`user_balance`.`Created_DATE` AS `BALANCE_CREATE_DATE`
FROM
  (
    `imei_info`.`user_balance`
    LEFT JOIN `imei_info`.`package_service_junction` ON(
      (
        `imei_info`.`user_balance`.`Package_SEQ_NUM` = `imei_info`.`package_service_junction`.`PACKAGE_SEQ_NUM`
      )
    )
  )