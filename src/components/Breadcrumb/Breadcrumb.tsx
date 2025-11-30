import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <div className="hidden bg-primary px-[20px] py-[20px] md:flex">
      <div className="flex items-center space-x-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center">
            {index > 0 && (
              <span className="mx-2 text-white">/</span>
            )}
            {item.href ? (
              <Link 
                href={item.href} 
                className="text-white hover:text-gray-200 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-white font-semibold">
                {item.label}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Breadcrumb;