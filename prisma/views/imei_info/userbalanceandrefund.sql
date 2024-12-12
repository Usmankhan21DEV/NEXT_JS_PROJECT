SELECT
  `u`.`USER_SEQ_NUM` AS `USER_SEQ_NUM`,
  `imei_info`.`i`.`USER_NAME` AS `USER_NAME`,
  `imei_info`.`i`.`EMAIL` AS `EMAIL`,
(
    SELECT
      coalesce(sum(`imei_info`.`vw_paymentdetail`.`AMOUNT`), 0)
    FROM
      `imei_info`.`vw_paymentdetail`
    WHERE
      (
        `imei_info`.`vw_paymentdetail`.`BUYER_ID` = `u`.`USER_SEQ_NUM`
      )
  ) AS `PAYMENTS`,
  max(
    (
      CASE
        WHEN (`p`.`NAME` LIKE '%GOLD%') THEN `u`.`BALANCE`
      END
    )
  ) AS `GOLD`,
  max(
    (
      CASE
        WHEN (`p`.`NAME` LIKE '%SILVER%') THEN `u`.`BALANCE`
      END
    )
  ) AS `SILVER`,
  max(
    (
      CASE
        WHEN (`p`.`NAME` LIKE '%BRONZE%') THEN `u`.`BALANCE`
      END
    )
  ) AS `BRONZE`,
(
    SELECT
      coalesce(sum(`imei_info`.`refund`.`AMOUNT`), 0)
    FROM
      `imei_info`.`refund`
    WHERE
      (
        `imei_info`.`refund`.`USER_SEQ_NUM` = `u`.`USER_SEQ_NUM`
      )
  ) AS `REFUND`,
(
    SELECT
      coalesce(
        sum(`imei_info`.`imei_user_junction`.`SERVICE_FEE`),
        0
      )
    FROM
      `imei_info`.`imei_user_junction`
    WHERE
      (
        `imei_info`.`imei_user_junction`.`USER_SEQ_NUM` = `u`.`USER_SEQ_NUM`
      )
  ) AS `USERS_EXPENDITURE`,
(
    SELECT
      count(
        coalesce(
          `imei_info`.`imei_user_junction`.`INFO_SEQ_NUM`,
          `imei_info`.`imei_user_junction`.`INFO_D_SEQ_NUM`
        )
      ) AS `USER_TOTAL_IMEI`
    FROM
      `imei_info`.`imei_user_junction`
    WHERE
      (
        `imei_info`.`imei_user_junction`.`USER_SEQ_NUM` = `u`.`USER_SEQ_NUM`
      )
  ) AS `USER_TOTAL_IMEI`,
(
    (
      (
        SELECT
          coalesce(sum(`imei_info`.`vw_paymentdetail`.`AMOUNT`), 0)
        FROM
          `imei_info`.`vw_paymentdetail`
        WHERE
          (
            `imei_info`.`vw_paymentdetail`.`BUYER_ID` = `u`.`USER_SEQ_NUM`
          )
      ) + (
        SELECT
          coalesce(sum(`imei_info`.`refund`.`AMOUNT`), 0)
        FROM
          `imei_info`.`refund`
        WHERE
          (
            `imei_info`.`refund`.`USER_SEQ_NUM` = `u`.`USER_SEQ_NUM`
          )
      )
    ) - (
      SELECT
        coalesce(
          sum(`imei_info`.`imei_user_junction`.`SERVICE_FEE`),
          0
        )
      FROM
        `imei_info`.`imei_user_junction`
      WHERE
        (
          `imei_info`.`imei_user_junction`.`USER_SEQ_NUM` = `u`.`USER_SEQ_NUM`
        )
    )
  ) AS `CUR_BALANCE`
FROM
  (
    (
      `imei_info`.`user_balance` `u`
      LEFT JOIN `imei_info`.`vw_user_info` `i` ON((`u`.`USER_SEQ_NUM` = `imei_info`.`i`.`SEQ_NUM`))
    )
    LEFT JOIN `imei_info`.`packages` `p` ON((`u`.`PACKAGE_SEQ_NUM` = `p`.`SEQ_NUM`))
  )
GROUP BY
  `u`.`USER_SEQ_NUM`