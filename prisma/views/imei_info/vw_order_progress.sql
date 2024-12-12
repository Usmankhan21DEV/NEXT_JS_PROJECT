SELECT
  count(
    (
      CASE
        WHEN (
          `imei_info`.`order_history`.`STATUS` = 'COMPLETED'
        ) THEN 1
      END
    )
  ) AS `COMPLETED`,
  count(
    (
      CASE
        WHEN (
          `imei_info`.`order_history`.`STATUS` = 'REJECTED'
        ) THEN 1
      END
    )
  ) AS `REJECTED`,
  count(
    (
      CASE
        WHEN (
          `imei_info`.`order_history`.`STATUS` = 'PROCESSING'
        ) THEN 1
      END
    )
  ) AS `PENDING`,
  count(`imei_info`.`order_history`.`STATUS`) AS `TOTAL`,
  `imei_info`.`order_history`.`USER_SEQ_NUM` AS `USER_SEQ_NUM`
FROM
  `imei_info`.`order_history`
GROUP BY
  `imei_info`.`order_history`.`USER_SEQ_NUM`