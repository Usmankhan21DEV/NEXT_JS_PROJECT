SELECT
  `b`.`SEQ_NUM` AS `SEQ_NUM`,
  `a`.`SEQ_NUM` AS `USER_SEQ_NUM`,
  `b`.`BALANCE` AS `BALANCE`,
  `p`.`NAME` AS `PACKAGE_NAME`,
  concat(`a`.`FIRST_NAME`, ' ', `a`.`LAST_NAME`) AS `USER_Name`
FROM
  (
    (
      `imei_info`.`user_info` `a`
      JOIN `imei_info`.`user_balance` `b`
    )
    JOIN `imei_info`.`packages` `p`
  )
WHERE
  (
    (`a`.`SEQ_NUM` = `b`.`USER_SEQ_NUM`)
    AND (`b`.`PACKAGE_SEQ_NUM` = `p`.`SEQ_NUM`)
  )
ORDER BY
  `b`.`SEQ_NUM`