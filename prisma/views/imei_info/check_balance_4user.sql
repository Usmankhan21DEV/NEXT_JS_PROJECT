WITH `servicefees` AS (
  SELECT
    `imei_info`.`imei_user_junction`.`USER_SEQ_NUM` AS `USER_SEQ_NUM`,
    sum(`imei_info`.`imei_user_junction`.`SERVICE_FEE`) AS `SERVICE_FEE`
  FROM
    `imei_info`.`imei_user_junction`
  GROUP BY
    `imei_info`.`imei_user_junction`.`USER_SEQ_NUM`
),
`payments` AS (
  SELECT
    `imei_info`.`payment_detail`.`BUYER_ID` AS `USER_SEQ_NUM`,
    sum(`imei_info`.`payment_detail`.`AMOUNT`) AS `AMOUNT`
  FROM
    `imei_info`.`payment_detail`
  GROUP BY
    `imei_info`.`payment_detail`.`BUYER_ID`
)
SELECT
  `sf`.`USER_SEQ_NUM` AS `USER_SEQ_NUM`,
(`p`.`AMOUNT` - `sf`.`SERVICE_FEE`) AS `BALANCE`,
  concat(`u`.`FIRST_NAME`, ' ', `u`.`LAST_NAME`) AS `FULL_NAME`
FROM
  (
    (
      `servicefees` `sf`
      JOIN `payments` `p` ON((`sf`.`USER_SEQ_NUM` = `p`.`USER_SEQ_NUM`))
    )
    JOIN `imei_info`.`user_info` `u` ON((`u`.`SEQ_NUM` = `sf`.`USER_SEQ_NUM`))
  )
WHERE
  (`u`.`ROLES` <> 99)