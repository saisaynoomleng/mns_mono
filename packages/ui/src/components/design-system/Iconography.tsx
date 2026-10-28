import type React from 'react';
import { Bounded, SectionTitle } from '../shared';

import { BsDash } from 'react-icons/bs';
import { LiaSignOutAltSolid } from 'react-icons/lia';
import {
  FaCcMastercard,
  FaExternalLinkAlt,
  FaHeart,
  FaNewspaper,
  FaSortAmountDown,
  FaUsers,
} from 'react-icons/fa';
import {
  MdDashboard,
  MdDesignServices,
  MdOutlineContactSupport,
  MdOutlineDesignServices,
  MdOutlineHealthAndSafety,
  MdOutlinePayments,
  MdReviews,
  MdWorkspaces,
} from 'react-icons/md';
import { AiFillAppstore } from 'react-icons/ai';
import { TfiSupport } from 'react-icons/tfi';
import { LuMessageCircleWarning, LuMessageSquareHeart } from 'react-icons/lu';
import { SiFacebook, SiGoogle, SiTiktok, SiYoutube } from 'react-icons/si';
import { CiLinkedin } from 'react-icons/ci';
import {
  TbLayoutBottombarCollapseFilled,
  TbTextWrapDisabled,
} from 'react-icons/tb';
import {
  IoArrowBackCircleSharp,
  IoCheckmark,
  IoClose,
  IoSettingsSharp,
} from 'react-icons/io5';
import { PiTextAlignJustifyFill } from 'react-icons/pi';
import { RiQuestionnaireLine } from 'react-icons/ri';
import { GrDocumentPerformance } from 'react-icons/gr';
import { IoMdChatbubbles } from 'react-icons/io';
import { FaUserGear, FaGripLines, FaCircleArrowRight } from 'react-icons/fa6';
import { GiGearHammer } from 'react-icons/gi';
import { BiSolidCategoryAlt } from 'react-icons/bi';

const icons: React.ReactElement[] = [
  <BsDash />,
  <LiaSignOutAltSolid />,
  <FaNewspaper />,
  <MdOutlineContactSupport />,
  <MdReviews />,
  <MdDesignServices />,
  <MdOutlineHealthAndSafety />,
  <FaCcMastercard />,
  <AiFillAppstore />,
  <TfiSupport />,
  <LuMessageCircleWarning />,
  <FaUsers />,
  <SiGoogle />,
  <SiFacebook />,
  <CiLinkedin />,
  <SiTiktok />,
  <TbTextWrapDisabled />,
  <MdDashboard />,
  <FaSortAmountDown />,
  <IoClose />,
  <IoCheckmark />,
  <IoSettingsSharp />,
  <MdOutlinePayments />,
  <PiTextAlignJustifyFill />,
  <RiQuestionnaireLine />,
  <GrDocumentPerformance />,
  <IoMdChatbubbles />,
  <MdOutlineDesignServices />,
  <FaUserGear />,
  <GiGearHammer />,
  <SiYoutube />,
  <FaGripLines />,
  <IoClose />,
  <FaExternalLinkAlt />,
  <IoArrowBackCircleSharp />,
  <LuMessageSquareHeart />,
  <FaHeart />,
  <TbLayoutBottombarCollapseFilled />,
  <MdWorkspaces />,
  <BiSolidCategoryAlt />,
  <FaCircleArrowRight />,
];

export const Iconography = (): React.JSX.Element => {
  return (
    <Bounded spacing="sm">
      <SectionTitle>Iconography</SectionTitle>
      <p>
        Icons provide a simple and recognizable visual language for
        communicating actions, navigation, status, and supporting information.
        The system uses icons from React Icons to maintain a consistent visual
        style across the interface.
      </p>

      <p>
        Icons should be clear, purposeful, and appropriately scaled to their
        surrounding content. They complement typography and UI elements without
        competing with the primary message.
      </p>

      <div className="flex flex-wrap gap-2 border p-2 rounded-lg">
        {icons.map((icon, i) => {
          return (
            <span
              key={i}
              className="text-fs-600 p-1 border border-muted-foreground rounded-lg"
            >
              {icon}
            </span>
          );
        })}
      </div>
    </Bounded>
  );
};
