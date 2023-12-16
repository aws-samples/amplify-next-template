import "../styles/globals.css";
import styles from "./page.module.css";
import MainPanel from "./components/main-panel";
import { acceptedYears, getInfoAutoInfo } from "@/services/InfoautoService";

const Home = async () => {
  const brandsResponse = await getInfoAutoInfo();
  const brands = brandsResponse?.data
    ?.filter(
      (i) =>
        i.groups &&
        i.groups.filter(
          (g) => g.prices_from && g.prices_to && g.prices_to > acceptedYears
        ).length > 0
    )
    .sort((a, b) => {
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
      return 0;
    })
    .map((obj) => {
      return {
        id: obj.id,
        name: obj.name.toLowerCase(),
        models: obj.groups,
      };
    });
  return (
    <>
      <div className={styles.bolaCeleste}></div>
      <div className={styles.bolaAzul}></div>
      <div className={styles.bolaGris}></div>
      <main className={styles.main}>
        <MainPanel brands={brands} />
      </main>
    </>
  );
};

export default Home;
