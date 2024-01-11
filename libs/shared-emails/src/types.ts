export interface EmailsConfigProps {
  title: string;
  email: string;
  help: string;
  homepage: string;
  socials?: { src: string; alt: string; href: string }[];
  links?: { title: string; href: string }[];
  copyright?: string | React.ReactNode;
  header: {
    logo: {
      src: string;
      width: number;
      height: number;
      alt?: string;
    };
  };
  footer: {
    logo: {
      src: string;
      width: number;
      height: number;
      alt?: string;
    };
  };
}
