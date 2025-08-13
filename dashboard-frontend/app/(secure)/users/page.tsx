import { SubmissionsDataTable} from "./data-table";
import { getPublicSubmissions } from "./query";

export default async function UsersPage() {
  const data = await getPublicSubmissions();
  return <SubmissionsDataTable initialData={data} />;
}
