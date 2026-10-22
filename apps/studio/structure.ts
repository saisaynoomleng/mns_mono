import { FaUserGear } from 'react-icons/fa6';
import { GiGearHammer } from 'react-icons/gi';
import { GrDocumentPerformance } from 'react-icons/gr';
import { IoMdChatbubbles } from 'react-icons/io';
import { MdOutlineDesignServices } from 'react-icons/md';
import { PiTextAlignJustifyFill } from 'react-icons/pi';
import { RiQuestionnaireLine } from 'react-icons/ri';
import { StructureResolver } from 'sanity/structure';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('mns')
    .items([
      S.divider().title('Operations'),
      S.listItem()
        .singleton('siteSetting')
        .title('Settings')
        .icon(GiGearHammer),
      S.documentTypeListItem('portfolio')
        .title('Portfolios')
        .icon(MdOutlineDesignServices),
      S.documentTypeListItem('teamMember')
        .title('Team Members')
        .icon(FaUserGear),

      S.divider().title('Marketing'),
      S.documentTypeListItem('faqs').title('FAQs').icon(RiQuestionnaireLine),
      S.documentTypeListItem('capability')
        .title('Capabilities')
        .icon(GrDocumentPerformance),
      S.documentTypeListItem('chatBubble')
        .title('Chat Bubbles')
        .icon(IoMdChatbubbles),

      S.divider().title('Pages'),
      S.documentTypeListItem('page')
        .title('Pages')
        .icon(PiTextAlignJustifyFill),
    ]);
