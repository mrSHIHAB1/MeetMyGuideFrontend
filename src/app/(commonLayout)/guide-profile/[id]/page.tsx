import MyProfile from "@/components/MyProfile/MyProfile";
import { getGuideById } from "@/services/admin/guideManagement";
import { getUserInfo } from "@/services/auth/getUserInfo";

interface Props {
  params: { id: string };
}

const MyProfilePage = async ( { params }: Props) => {
  const { id } = await params;
  const guide =  await getGuideById(id);
  console.log("guide profile",guide)
  return <MyProfile userInfo={guide} />;
};

export default MyProfilePage;
