SELECT
  `a`.`SEQ_NUM` AS `SEQ_NUM`,
  `imei_info`.`b`.`USER_NAME` AS `USER_NAME`,
  `a`.`USER_SEQ_NUM` AS `USER_SEQ_NUM`,
  `a`.`AMOUNT` AS `AMOUNT`,
  `a`.`PACKAGE_SEQ_NUM` AS `PACKAGE_SEQ_NUM`,
  `imei_info`.`c`.`SERVICE_NAME` AS `SERVICE_NO`,
  coalesce(`imei_info`.`c`.`PACKAGE_NAME`, `d`.`Name`) AS `NAME`,
  `a`.`BALANCE_SEQ_NUM` AS `BALANCE_SEQ_NUM`,
  `a`.`REASON` AS `REASON`,
  `a`.`CREATED_DATE` AS `CREATED_DATE`
FROM
  (
    (
      (
        `imei_info`.`refund` `a`
        LEFT JOIN `imei_info`.`vw_user_info` `b` ON((`a`.`USER_SEQ_NUM` = `imei_info`.`b`.`SEQ_NUM`))
      )
      LEFT JOIN `imei_info`.`vw_ps_junction` `c` ON((`a`.`SERVICE_NO` = `imei_info`.`c`.`SEQ_NUM`))
    )
    LEFT JOIN `imei_info`.`packages` `d` ON((`a`.`PACKAGE_SEQ_NUM` = `d`.`SEQ_NUM`))
  )