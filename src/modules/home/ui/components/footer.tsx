import { Footer } from "@/components/ui/footer";
import { Hexagon, Github, Twitter } from "lucide-react";

export const FooterComponent = () => {
  return (
    <div className="w-full">
      <Footer
        logo={<Hexagon className="h-10 w-10" />}
        brandName="Awesome Corp"
        socialLinks={[
          {
            icon: <Twitter className="h-5 w-5" />,
            href: "https://twitter.com",
            label: "Twitter",
          },
          {
            icon: <Github className="h-5 w-5" />,
            href: "https://github.com",
            label: "GitHub",
          },
        ]}
        mainLinks={[
          { href: "/products", label: "Products" },
          { href: "/about", label: "About" },
          { href: "/blog", label: "Blog" },
          { href: "/contact", label: "Contact" },
        ]}
        legalLinks={[
          { href: "/privacy", label: "Privacy" },
          { href: "/terms", label: "Terms" },
        ]}
        copyright={{
          text: "© 2024 Awesome Corp",
          license: "All rights reserved",
        }}
      />
    </div>
  );
};
