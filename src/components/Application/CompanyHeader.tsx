import Image from "next/image";

export const CompanyHeader = ({
  companyName,
  companyImg,
}: {
  companyName: string;
  companyImg: string;
}) => (
  <div className="flex items-center gap-4 border-b border-gray-200 pb-4 mb-4 bg-white p-4 rounded-t-lg">
    <Image
      src={companyImg || "/placeholder-image.png"}
      alt={`${companyName} Logo`}
      className="rounded-full"
      width={64}
      height={64}
    />
    <h2 className="text-2xl font-semibold">{companyName}</h2>
  </div>
);
