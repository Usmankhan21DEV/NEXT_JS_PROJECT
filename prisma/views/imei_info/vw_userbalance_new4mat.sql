SELECT
  `imei_info`.`s`.`USER_NAME` AS `USER_NAME`,
  `imei_info`.`s`.`EMAIL` AS `EMAIL`,
  max(
    (
      CASE
        WHEN (`p`.`NAME` LIKE '%GOLD%') THEN `ub`.`BALANCE`
      END
    )
  ) AS `GOLD`,
  max(
    (
      CASE
        WHEN (`p`.`NAME` LIKE '%SILVER%') THEN `ub`.`BALANCE`
      END
    )
  ) AS `SILVER`,
  max(
    (
      CASE
        WHEN (`p`.`NAME` LIKE '%BRONZE%') THEN `ub`.`BALANCE`
      END
    )
  ) AS `BRONZE`,
(
    (
      coalesce(
        max(
          (
            CASE
              WHEN (`p`.`NAME` LIKE '%GOLD%') THEN `ub`.`BALANCE`
            END
          )
        ),
        0
      ) + coalesce(
        max(
          (
            CASE
              WHEN (`p`.`NAME` LIKE '%SILVER%') THEN `ub`.`BALANCE`
            END
          )
        ),
        0
      )
    ) + coalesce(
      max(
        (
          CASE
            WHEN (`p`.`NAME` LIKE '%BRONZE%') THEN `ub`.`BALANCE`
          END
        )
      ),
      0
    )
  ) AS `TOTAL`
FROM
  (
    (
      `imei_info`.`user_balance` `ub`
      LEFT JOIN `imei_info`.`vw_user_info` `s` ON(
        (`ub`.`USER_SEQ_NUM` = `imei_info`.`s`.`SEQ_NUM`)
      )
    )
    LEFT JOIN `imei_info`.`packages` `p` ON((`p`.`SEQ_NUM` = `ub`.`PACKAGE_SEQ_NUM`))
  )
GROUP BY
  `ub`.`USER_SEQ_NUM`