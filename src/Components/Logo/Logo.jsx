import LogoMobile from "../../assets/Logo/logo_mobile@1x.png";
import LogoMobile2x from "../../assets/Logo/logo_mobile@2x.webp";
import LogoTablet from "../../assets/Logo/logo_tablet1x.png";
import LogoTablet2x from "../../assets/Logo/logo_tablet2x.webp";
import LogoDesktop from "../../assets/Logo/logo_desktop1x.png";
import LogoDesktop2x from "../../assets/Logo/logo_desktop2x@2x.webp";
import styles from "./Logo.module.css"
export default function Logo() {
  return (
    <picture className={styles.logo}>
      <source
        media="(min-width: 1400px) and (min-resolution: 192dpi)"
        srcSet={LogoDesktop2x}
        width="348"
      />
      <source media="(min-width: 1440px) " srcSet={LogoDesktop} />
      <source
        media="(min-width: 768px) and (min-resolution: 192dpi)"
        srcSet={LogoTablet2x}
        width="255"
      />
      <source media="(min-width: 768px)" srcSet={LogoTablet} />

      <source
        media="(min-resolution: 192dpi) "
        srcSet={LogoMobile2x}
        width="180"
      />
      <img src={LogoMobile} alt="TYUPA"/>
    </picture>
  );
}
