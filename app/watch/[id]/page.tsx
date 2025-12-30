
interface Props {
  params: Promise<{ id: string }>;
}

// Fixed: Changed 'page' to 'Page'
const Page = async ({ params }: Props) => {
  const { id } = await params;
  return <div> Hello</div>;
};

export default Page;
