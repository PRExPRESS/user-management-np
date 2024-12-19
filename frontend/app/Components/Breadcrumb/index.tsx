import Link from 'next/link'
import React from 'react'

interface Props {
  title: string;
  link: string;
}

interface BreadcrumbProps {
  items: Props[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <div className="w-full flex flex-row items-center justify-start ">
      {items.map((item, index) => (
        <div key={index} className="flex flex-row items-center justify-center ">
          
          {index !== items.length - 1 ? (
            <Link href={item.link} className="text-accent font-bold text-sm">
              {item.title}
            </Link>
          ) : (
            <span className="text-gray-500  font-bold text-sm">{item.title}</span>
          )}

          
          {index !== items.length - 1 && (
            <span className="text-text-light dark:text-text-dark mx-1">/</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default Breadcrumb;
