SELECT
  `s`.`NAME` AS `SERVICE_NAME`,
  max(
    (
      CASE
        WHEN (`p`.`NAME` LIKE '%GOLD%') THEN `psj`.`COST`
      END
    )
  ) AS `GOLD`,
  max(
    (
      CASE
        WHEN (`p`.`NAME` LIKE '%SILVER%') THEN `psj`.`COST`
      END
    )
  ) AS `SILVER`,
  max(
    (
      CASE
        WHEN (`p`.`NAME` LIKE '%BRONZE%') THEN `psj`.`COST`
      END
    )
  ) AS `BRONZE`
FROM
  (
    (
      `imei_info`.`package_service_junction` `psj`
      LEFT JOIN `imei_info`.`services` `s` ON((`psj`.`SERVICE_SEQ_NUM` = `s`.`SEQ_NUM`))
    )
    LEFT JOIN `imei_info`.`packages` `p` ON((`p`.`SEQ_NUM` = `psj`.`PACKAGE_SEQ_NUM`))
  )
GROUP BY
  `s`.`NAME`