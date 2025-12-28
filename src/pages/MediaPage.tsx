import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SectionHeading } from "@/components/ui/section-heading";
import { MediaCard } from "@/components/ui/media-card";
import { Newspaper, Mail } from "lucide-react";

// Import all media images
import GirlSkills from "../assets/media/GirlsSkills.png";
import EnggUpadhi from "../assets/media/EnggUpadhi.png";
import DigitalIndia from "../assets/media/DigitalIndia.png";
import Sankiethika from "../assets/media/Sankiethika.png";
import JNTVSadassu from "../assets/media/JNTVSadassu.png";
import Samaja from "../assets/media/Samaja.png";
import CyberIntel from "../assets/media/CyberIntel.png";
import Girls from "../assets/media/Girls.png";
import RuleAwareness from "../assets/media/RuleAwareness.png";
import SelfDefense from "../assets/media/SelfDefense.png";
import DSPFaliciate from "../assets/media/DSPFaliciate.png";
import FutureScope from "../assets/media/FutureScope.png";
import DataScience from "../assets/media/DataScience.png";
import Teaching from "../assets/media/Teaching.png";
import Covid from "../assets/media/Covid.png";
import OnlineFaculty from "../assets/media/OnlineFaculty.png";
import RProgram from "../assets/media/RProgram.png";
import NotOnlyBooks from "../assets/media/NotOnlyBooks.png";
import ITYukta2k17 from "../assets/media/ITYukta2k17.png";
import RegistraRJS from "../assets/media/RegistraRJS.png";
import IndependenceDay from "../assets/media/Independenceday.png";
import Awards from "../assets/media/Awards.png";

const MediaPage = () => {
  const mediaItems = [
    {
      title: "Skill Development Program for Women",
      source: "Telugu Daily Newspaper",
      date: "2024",
      image: GirlSkills,
      description:
        "Women empowerment and skill development initiative highlighting training programs and community participation aimed at enhancing livelihood opportunities.",
      type: "press",
    },
    {
      title: "Employment Opportunities for Engineering Graduates",
      source: "Engg Upadhi (Telugu Newspaper)",
      date: "2016",
      image: EnggUpadhi,
      description:
        "Awareness program conducted to guide engineering graduates on employment opportunities, career planning, and skill development through seminars and expert interactions.",
      type: "press",
    },
    {
      title: "Digital India Awareness Program",
      source: "Telugu Daily Newspaper",
      date: "2015",
      image: DigitalIndia,
      description:
        "Digital India awareness program organized to promote digital literacy, e-governance initiatives, and technology adoption among students and the public.",
      type: "press",
    },
    {
      title: "Technical Awareness and Innovation Program",
      source: "Telugu Daily Newspaper",
      date: "2017",
      image: Sankiethika,
      description:
        "Technical and innovation-focused program conducted to enhance students' awareness of emerging technologies, research culture, and practical learning through seminars and demonstrations.",
      type: "press",
    },
    {
      title: "JNTV Technical Seminar and Academic Conference",
      source: "Telugu Daily Newspaper",
      date: "2017",
      image: JNTVSadassu,
      description:
        "Academic and technical seminar organized under JNTV platform to promote knowledge sharing, student participation, and discussions on science, engineering, and innovation.",
      type: "press",
    },
    {
      title: "Cyber Intelligence and Security Awareness Seminar",
      source: "Telugu Daily Newspaper",
      date: "2023",
      image: CyberIntel,
      description:
        "Cyber intelligence and security awareness seminar focusing on cyber safety, digital threats, and best practices for secure use of technology among students and faculty.",
      type: "press",
    },
    {
      title: "Women Empowerment and Social Awareness Program",
      source: "Samaja Telugu Newspaper",
      date: "2023",
      image: Samaja,
      description:
        "Social awareness program highlighting women empowerment, leadership, and community development initiatives conducted through seminars and public engagement.",
      type: "press",
    },
    {
      title: "Legal and Rule Awareness Program for Women",
      source: "Visalaandhra Telugu Newspaper",
      date: "2023",
      image: Girls,
      description:
        "Rule awareness program organized to educate women on legal rights, social laws, and safety measures, promoting informed participation in society.",
      type: "press",
    },
    {
      title: "Awareness Program on Social Responsibilities and Values",
      source: "Mana Vizianagaram / Visalaandhra (Telugu Newspaper)",
      date: "2023",
      image: RuleAwareness,
      description:
        "Awareness program conducted focusing on social responsibilities, ethical values, and community participation, with active involvement of women and students.",
      type: "press",
    },
    {
      title: "Self-Defense Awareness Program for Women",
      source: "Telugu Daily Newspaper",
      date: "2018",
      image: SelfDefense,
      description:
        "Self-defense awareness program conducted to empower women with safety skills, confidence, and practical techniques for personal security.",
      type: "press",
    },
    {
      title: "DSP Felicitation and Awareness Interaction",
      source: "Telugu Daily Newspaper",
      date: "2018",
      image: DSPFaliciate,
      description:
        "Felicitation program honoring DSP officials, featuring an interactive session to inspire students and discuss law enforcement, discipline, and public service.",
      type: "press",
    },
    {
      title: "Career Guidance and Future Scope Awareness Program",
      source: "Telugu Daily Newspaper",
      date: "2017",
      image: FutureScope,
      description:
        "Career guidance program highlighting future opportunities, emerging fields, and higher education pathways to help students plan their professional growth.",
      type: "press",
    },
    {
      title: "COVID-19 Awareness and Safety Initiative",
      source: "Telugu Daily Newspaper",
      date: "2020",
      image: Covid,
      description:
        "Public awareness initiative conducted to educate citizens on COVID-19 safety measures, health protocols, and community responsibility during the pandemic.",
      type: "press",
    },
    {
      title: "Innovative Teaching and Learning Practices Program",
      source: "Telugu Daily Newspaper",
      date: "2020",
      image: Teaching,
      description:
        "Program focused on innovative teaching methodologies, online learning practices, and faculty development to enhance academic quality and student engagement.",
      type: "press",
    },
    {
      title: "Data Science and Advanced Analytics Awareness Program",
      source: "Telugu Daily Newspaper",
      date: "2020",
      image: DataScience,
      description:
        "Awareness program conducted on data science, analytics, and emerging digital technologies, highlighting their applications in education, research, and industry.",
      type: "press",
    },
    {
      title: "Education Beyond Textbooks Initiative",
      source: "Telugu Daily Newspaper",
      date: "2017",
      image: NotOnlyBooks,
      description:
        "Educational initiative emphasizing holistic learning beyond textbooks through seminars, discussions, and interactive academic activities.",
      type: "press",
    },
    {
      title: "Hands-on Training Program on R Programming",
      source: "Sakshi Telugu Newspaper",
      date: "2017",
      image: RProgram,
      description:
        "Training programme organized to provide hands-on exposure to R programming and statistical computing for students and faculty to enhance analytical skills.",
      type: "press",
    },
    {
      title: "Online Faculty Development Programme on Data Science",
      source: "The Hindu Newspaper",
      date: "2020",
      image: OnlineFaculty,
      description:
        "Online faculty development programme conducted on data science and its applications in STEM, involving faculty members, research scholars, and students from multiple institutions.",
      type: "press",
    },
    {
      title: "Awards and Recognition for Student Achievements",
      source: "Telugu Daily Newspaper",
      date: "2019",
      image: Awards,
      description:
        "Awards ceremony organized to recognize outstanding student achievements in academics, extracurricular activities, and overall excellence.",
      type: "press",
    },
    {
      title: "Independence Day Celebrations at University Campus",
      source: "Telugu Daily Newspaper",
      date: "2019",
      image: IndependenceDay,
      description:
        "Independence Day celebrations conducted with flag hoisting, student participation, and activities emphasizing patriotism, unity, and national values.",
      type: "press",
    },
    {
      title: "Registrar J.S. Felicitation and Academic Interaction",
      source: "Telugu Daily Newspaper",
      date: "2017",
      image: RegistraRJS,
      description:
        "Felicitation program honoring the Registrar for academic leadership, followed by an interaction session highlighting governance, institutional growth, and quality education.",
      type: "press",
    },
    {
      title: "IT Yukta 2K17 – Technical and Innovation Summit",
      source: "Telugu Daily Newspaper",
      date: "2017",
      image: ITYukta2k17,
      description:
        "Technical and innovation summit organized to promote student creativity, interdisciplinary learning, and technological excellence through competitions and expert sessions.",
      type: "press",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative pt-28 pb-16 bg-gradient-to-b from-cream-dark via-cream/40 to-background overflow-hidden">
        {/* Subtle Grid Pattern Background */}
        <div 
          className="absolute inset-0 opacity-[0.04]" 
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(0 0 0 / 0.15) 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        />
        
        {/* Decorative Blur Elements for Depth */}
        <div className="absolute top-20 right-10 w-32 h-32 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
        
        <div className="container-wide px-4 sm:px-6 lg:px-12 text-center relative z-10">
          {/* Main Title with Fade-In Animation */}
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-4 tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-700">
            Media Coverage
          </h1>

          {/* Gold Accent Underline */}
          <div className="mx-auto h-1 w-24 bg-accent rounded-full mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150" />

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            Newspaper features, interviews, and public addresses
          </p>
        </div>
      </section>

      {/* Media Gallery */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container-wide px-4 sm:px-6 lg:px-12">
          {/* Enhanced Section Heading */}
          <div className="mb-12 text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Newspaper className="h-7 w-7 text-accent animate-in fade-in zoom-in-50 duration-500" />
              <h2 className="text-3xl md:text-4xl font-semibold text-primary font-serif animate-in fade-in slide-in-from-bottom-3 duration-700">
                Press & Publications
              </h2>
            </div>
            <p className="text-muted-foreground text-lg animate-in fade-in slide-in-from-bottom-3 duration-700 delay-150">
              News coverage and media features highlighting institutional initiatives
            </p>
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 sm:gap-5 md:gap-6 space-y-4 sm:space-y-5 md:space-y-6 mt-8 sm:mt-10 md:mt-12">
            {mediaItems.map((item, index) => (
              <MediaCard key={index} {...item} imageUrl={item.image} />
            ))}
          </div>
        </div>
      </section>

      {/* Interview Requests */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-muted/40 via-muted/20 to-background">
        <div className="container-narrow px-4 sm:px-6 lg:px-12 text-center">
          {/* Enhanced Section Heading */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Mail className="h-6 w-6 text-accent animate-in fade-in zoom-in-50 duration-500" />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-primary font-serif animate-in fade-in slide-in-from-bottom-3 duration-700">
                Media Inquiries
              </h2>
            </div>
          </div>

          <p className="text-sm sm:text-base text-muted-foreground mb-5 sm:mb-6 max-w-xl mx-auto px-4 animate-in fade-in slide-in-from-bottom-3 duration-700 delay-150">
            For interview requests, speaking engagements, or media inquiries,
            please contact the Office of the Registrar.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 text-sm sm:text-base text-accent hover:text-accent/80 font-medium transition-all duration-300 hover:gap-3 animate-in fade-in slide-in-from-bottom-3 duration-700 delay-300"
          >
            Contact Us →
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MediaPage;