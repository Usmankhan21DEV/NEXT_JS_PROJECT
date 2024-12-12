SELECT
  `c`.`SEQ_NUM` AS `SEQ_NUM`,
  `c`.`TRANS_ID` AS `TRANS_ID`,
  `p`.`PAYMENT_TYPE_NAME` AS `PAYMENT_METHOD`,
  `pkg`.`Name` AS `PACKAGE_NAME`,
  `c`.`STATUS` AS `STATUS`,
  `c`.`USER_SEQ_NUM` AS `USER_SEQ_NUM`,
  `c`.`BUYER_EMAIL` AS `BUYER_EMAIL`,
  `c`.`FIRST_NAME` AS `FIRST_NAME`,
  `c`.`LAST_NAME` AS `LAST_NAME`,
  `c`.`BUYER_ID` AS `BUYER_ID`,
  `c`.`AMOUNT` AS `AMOUNT`,
  `c`.`TAX` AS `TAX`,
  `c`.`CREATE_DATETIME` AS `CREATE_DATETIME`,
  `c`.`UPDATE_DATETIME` AS `UPDATE_DATETIME`
FROM
  (
    (
      `imei_info`.`payment_detail` `c`
      LEFT JOIN `imei_info`.`payment_types` `p` ON((`p`.`SEQ_NUM` = `c`.`PAYMENT_METHOD`))
    )
    LEFT JOIN `imei_info`.`packages` `pkg` ON((`c`.`Package_SEQ_NUM` = `pkg`.`SEQ_NUM`))
  )