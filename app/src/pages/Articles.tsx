import Article from "../ui/article/Article";

export default function Articles() {
  return <div className="pt-16 md:pt-[72px] dark:bg-bgDark flex flex-col items-center">
    <Article imageSrc="../../images/hero.jpg" title="Pierwszy przepis duży" author="Karol" date="17-05-2024"/>
    <Article imageSrc="../../images/hero.jpg" title="Pierwszy" author="Mateusz" date="16-05-2024"/>
    <Article imageSrc="../../images/hero.jpg" title="Pierwszy przepis duży" author="Łukasz" date="18-05-2024"/>
  </div>;
}
