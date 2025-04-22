const ElectionPage = async ({
  params,
}: {
  params: Promise<{ address: string }>;
}) => {
  const { address } = await params;

  return <div>Election with address {address}</div>;
};

export default ElectionPage;
