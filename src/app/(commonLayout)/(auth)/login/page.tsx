import Signin from "@/components/Signin";

const LoginPage =async ({
    searchParams,
  }: {
    searchParams?: Promise<{ redirect?: string }>;
  }) => {
    const params = (await searchParams) || {};
    return (
        <div>
            <Signin redirect={params.redirect} />
        </div>
    );
};

export default LoginPage;