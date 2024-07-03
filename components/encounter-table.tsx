import { toInteger } from "lodash-es";
import { Trans, useTranslation } from "next-i18next";
import Link from "next/link";

interface EncounterTableP {
  playerCount: number;
  battleCount: number;
  level: number;
}
export default function EncounterTable({
  playerCount,
  level,
  battleCount: battlecount,
}: EncounterTableP) {
  const meqBudget = [0, 1, 2, 3, 5, 7, 9, 11][playerCount];
  let battleLevel = level
  if (level >= 5) battleLevel++
  if (level >= 8) battleLevel++
  if (battlecount === 3) battleLevel++

  const { t } = useTranslation("calculator");

  return (
    <>
      <p>
        <Trans
          t={t}
          i18nKey="encounter-rules-info"
          components={{
            "rules-link": (
              <Link href="/compendium/basic-rules/running-the-game" />
            ),
          }}
        />
      </p>
      <p>
        {t("budget")} <strong>{t("budgetresult", { count: meqBudget })}</strong>
      </p>

      <div className="overflow-auto w-min max-w-full border dark:border-stone-700 rounded shadow bg-white dark:bg-stone-700 border-stone-300 my-2">
        <table>
          <thead>
            <tr>
              <th>{t("monsterlevel")}</th>
              <th>{t("standard", { mooks: 5 })}</th>
              <th>{t("elite", { mooks: '7-8' })}</th>
              <th>{t("large", { mooks: 10 })}</th>
              <th>{t("huge", { mooks: 15 })}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{battleLevel - 2}</td>
              <td>0.5</td>
              <td>0.7</td>
              <td>1</td>
              <td>1.5</td>
            </tr>
            <tr>
              <td>{battleLevel - 1}</td>
              <td>0.7</td>
              <td>1</td>
              <td>1.5</td>
              <td>2</td>
            </tr>
            <tr>
              <td>
                <strong>{battleLevel}</strong>
              </td>
              <td>
                <strong>1</strong>
              </td>
              <td>
                <strong>1.5</strong>
              </td>
              <td>
                <strong>2</strong>
              </td>
              <td>
                <strong>3</strong>
              </td>
            </tr>
            <tr>
              <td>{battleLevel + 1}</td>
              <td>1.5</td>
              <td>2*</td>
              <td>3*</td>
              <td>4*</td>
            </tr>
            <tr>
              <td>{battleLevel + 2}</td>
              <td>2*</td>
              <td>3**</td>
              <td>4**</td>
              <td>6**</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        <em>{t("footnote1")}</em>
      </p>
      <p>
        <em>{t("footnote2")}</em>
      </p>
    </>
  );
}
