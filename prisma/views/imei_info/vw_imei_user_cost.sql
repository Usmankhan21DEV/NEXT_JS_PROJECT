SELECT
  `b`.`SEQ_NUM` AS `SEQ_NUM`,
  `b`.`INFO_SEQ_NUM` AS `INFO_SEQ_NUM`,
  `b`.`USER_SEQ_NUM` AS `USER_SEQ_NUM`,
  `a`.`SEQ_NUM` AS `SERVICE_NO`,
  `a`.`SERVICE_SEQ_NUM` AS `SERVICE_SEQ_NUM`,
  `a`.`PACKAGE_SEQ_NUM` AS `PACKAGE_SEQ_NUM`,
  `a`.`COST` AS `SERVICE_FEE`,
  `b`.`Search_DATE` AS `SEARCH_DATE`,
  `a`.`CREATE_DATE` AS `PS_CREATED_DATE`
FROM
  (
    `imei_info`.`package_service_junction` `a`
    JOIN `imei_info`.`imei_user_junction` `b` ON((`a`.`SEQ_NUM` = `b`.`SERVICE_NO`))
  )