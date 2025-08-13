import { getSubmissions } from "./query";
import Data from "./data";

export default async function DashboardPage() {
  const submissions = await getSubmissions();
  return <Data initialSubmissions={submissions} />;
}
