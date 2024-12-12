SELECT
  `s`.`SEQ_NUM` AS `SEQ_NUM`,
  `a`.`USER_SEQ_NUM` AS `USER_SEQ_NUM`,
  `a`.`BALANCE` AS `BALANCE`,
  `p`.`NAME` AS `PACKAGES`,
  `p`.`SEQ_NUM` AS `PACKAGE_SEQ_NUM`,
  `s`.`NAME` AS `SERVICES`,
  `s`.`SEQ_NUM` AS `SERVICE_SEQ_NUM`,
  `b`.`SEQ_NUM` AS `PSJ_SEQ_NUM`,
  `b`.`COST` AS `COST`,
  `b`.`CREATE_DATE` AS `COST_CREATED_DATE`,
  `a`.`CREATED_DATE` AS `BALANCE_CREATED_DATE`,
  concat(
    '$ ',
    `b`.`COST`,
    ' - ',
    `p`.`NAME`,
    ' - ',
    `s`.`NAME`
  ) AS `COMPLETE_SERVICE_NAME`
FROM
  (
    (
      (
        `imei_info`.`user_balance` `a`
        LEFT JOIN `imei_info`.`package_service_junction` `b` ON((`a`.`PACKAGE_SEQ_NUM` = `b`.`PACKAGE_SEQ_NUM`))
      )
      LEFT JOIN `imei_info`.`packages` `p` ON((`a`.`PACKAGE_SEQ_NUM` = `p`.`SEQ_NUM`))
    )
    LEFT JOIN `imei_info`.`services` `s` ON((`b`.`SERVICE_SEQ_NUM` = `s`.`SEQ_NUM`))
  )