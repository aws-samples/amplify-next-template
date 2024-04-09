import usePerson from "@/api/usePerson";
import MainLayout from "@/components/layouts/MainLayout";
import { useRouter } from "next/router";

const PersonDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { person, loadingPerson } = usePerson(Array.isArray(id) ? id[0] : id);

  return (
    <MainLayout
      title={person?.name}
      recordName={person?.name}
      sectionName="People"
    >
      {loadingPerson && "Loading person..."}
      {JSON.stringify(person)}
    </MainLayout>
  );
};

export default PersonDetailPage;
