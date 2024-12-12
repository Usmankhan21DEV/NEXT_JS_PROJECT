SELECT
  `a`.`SEQ_NUM` AS `SEQ_NUM`,
  `a`.`FIRST_NAME` AS `FIRST_NAME`,
  `a`.`LAST_NAME` AS `LAST_NAME`,
  `a`.`EMAIL` AS `EMAIL`,
  `a`.`CONTACT_NUMBER` AS `CONTACT_NUMBER`,
  `a`.`ADDRESS_1` AS `ADDRESS_1`,
  `a`.`ADDRESS_2` AS `ADDRESS_2`,
  `a`.`CITY` AS `CITY`,
  `a`.`STATE` AS `STATE`,
  `a`.`COUNTRY` AS `COUNTRY`,
  `a`.`PASSWORD` AS `PASSWORD`,
  `a`.`VARIFIED` AS `VARIFIED`,
  `a`.`TRAIL_PERIOD` AS `TRIAL_PERIOD`,
  `a`.`IS_ACTIVE` AS `IS_ACTIVE`,
  `a`.`IS_LOGIN` AS `IS_LOGIN`,
  `a`.`USER_IP` AS `USER_IP`,
  `a`.`ROLES` AS `ROLE_ID`,
  `c`.`ROLE_NAME` AS `ROLE_NAME`,
  `c`.`ROLE_RIGHTS` AS `RIGHTS`,
  `b`.`BALANCE` AS `BALANCE`,
  concat(`a`.`FIRST_NAME`, ' ', `a`.`LAST_NAME`) AS `USER_NAME`,
  `d`.`USER_TOTAL_IMEI` AS `USER_TOTAL_IMEI`,
  `d`.`USERS_EXPENDITURE` AS `USERS_EXPENDITURE`,
  `ptd`.`TOTAL` AS `TOTAL_BALANCE`,
  `a`.`DEFAULT_EMAIL` AS `DEFAULT_EMAIL`
FROM
  (
    (
      (
        (
          `imei_info`.`user_info` `a`
          LEFT JOIN (
            SELECT
              `imei_info`.`user_balance`.`USER_SEQ_NUM` AS `USER_SEQ_NUM`,
              sum(`imei_info`.`user_balance`.`BALANCE`) AS `BALANCE`
            FROM
              `imei_info`.`user_balance`
            GROUP BY
              `imei_info`.`user_balance`.`USER_SEQ_NUM`
          ) `b` ON((`a`.`SEQ_NUM` = `b`.`USER_SEQ_NUM`))
        )
        LEFT JOIN `imei_info`.`user_roles` `c` ON((`a`.`ROLES` = `c`.`ROLE_ID`))
      )
      LEFT JOIN (
        SELECT
          `imei_info`.`imei_user_junction`.`USER_SEQ_NUM` AS `USER_SEQ_NUM`,
          count(
            coalesce(
              `imei_info`.`imei_user_junction`.`INFO_SEQ_NUM`,
              `imei_info`.`imei_user_junction`.`INFO_D_SEQ_NUM`
            )
          ) AS `USER_TOTAL_IMEI`,
          sum(`imei_info`.`imei_user_junction`.`SERVICE_FEE`) AS `USERS_EXPENDITURE`
        FROM
          `imei_info`.`imei_user_junction`
        GROUP BY
          `imei_info`.`imei_user_junction`.`USER_SEQ_NUM`
      ) `d` ON((`a`.`SEQ_NUM` = `d`.`USER_SEQ_NUM`))
    )
    LEFT JOIN (
      SELECT
        sum(`imei_info`.`payment_detail`.`AMOUNT`) AS `TOTAL`,
        `imei_info`.`payment_detail`.`BUYER_ID` AS `BUYER_ID`
      FROM
        `imei_info`.`payment_detail`
      GROUP BY
        `imei_info`.`payment_detail`.`BUYER_ID`
    ) `ptd` ON((`a`.`SEQ_NUM` = `ptd`.`BUYER_ID`))
  )