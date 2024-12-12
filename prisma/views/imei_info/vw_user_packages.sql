SELECT
  `c`.`SEQ_NUM` AS `SEQ_NUM`,
  `c`.`NAME` AS `NAME`,
  `c`.`USER_SEQ_NUM` AS `USER_SEQ_NUM`
FROM
  (
    SELECT
      `a`.`SEQ_NUM` AS `SEQ_NUM`,
      `a`.`Name` AS `NAME`,
      `b`.`USER_SEQ_NUM` AS `USER_SEQ_NUM`
    FROM
      (
        `imei_info`.`packages` `a`
        JOIN `imei_info`.`user_balance` `b` ON((`a`.`SEQ_NUM` = `b`.`Package_SEQ_NUM`))
      )
    GROUP BY
      `a`.`SEQ_NUM`,
      `b`.`USER_SEQ_NUM`
  ) `c`