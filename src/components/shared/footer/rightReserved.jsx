import { socialLinks } from "../../../utils";

const RightReserved = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="md:h-[72px] border-t flex  flex-col md:flex-row justify-between pt-1 md:pt-0 items-center">
      <p className="text-[#9E9E9E] text-xs md:text-md lg:text-lg">
        © {currentYear} Jetpay. All rights reserved
      </p>

      <ul className="flex gap-3 my-1  lg:mt-0">
        {socialLinks.map((link, index) => (
          <li
            key={index}
            className="bg-primarylight h-[24px] w-[24px] text-sm rounded-full flex items-center justify-center"
          >
            <a className="text-primary" href={link?.link}>
              {link?.icon}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RightReserved;
