"use client";

import React from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import i18n from "@/lib/i18n";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
  Chip,
  Paper,
  Avatar,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import {
  Psychology,
  Phone,
  Email,
  LocationOn,
  AccessTime,
  Star,
  Security,
  Language,
  Menu as MenuIcon,
  CalendarToday,
} from "@mui/icons-material";
import Image from "next/image";

interface HomeProps {
  params: Promise<{ locale: string }>;
}

export default function Home({ params }: HomeProps) {
  const { t } = useTranslation();
  const [isReady, setIsReady] = useState(false);
  const [locale, setLocale] = useState<string>("fr");
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(
    null
  );

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const setupLocale = async () => {
      const resolvedParams = await params;
      setLocale(resolvedParams.locale);

      // Change language when locale changes
      if (i18n.isInitialized && i18n.language !== resolvedParams.locale) {
        await i18n.changeLanguage(resolvedParams.locale);
      }

      setIsReady(true);
    };
    setupLocale();
  }, [params]);

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    handleMobileMenuClose();
  };

  const navigationItems = [
    { label: locale === "ar" ? "الرئيسية" : "Accueil", id: "home" },
    { label: locale === "ar" ? "عن الطبيبة" : "À propos", id: "about" },
    { label: locale === "ar" ? "الخدمات" : "Services", id: "services" },
    { label: locale === "ar" ? "اتصل بنا" : "Contact", id: "contact" },
  ];

  if (!isReady) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Typography variant="h6" color="primary">
          {locale === "ar" ? "جاري التحميل..." : "Chargement..."}
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <AppBar position="sticky" color="default" elevation={1}>
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
            <Image
              src="../../public/logo_large.svg"
              alt="Dr. Malika Lkhabir"
              width={276}
              height={31}
              style={{ height: "auto", maxWidth: "200px" }}
            />
          </Box>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
              {navigationItems.map((item) => (
                <Button
                  key={item.id}
                  color="inherit"
                  onClick={() => scrollToSection(item.id)}
                  sx={{ fontWeight: 500 }}
                >
                  {item.label}
                </Button>
              ))}
              <LanguageSwitcher currentLocale={locale} />
            </Box>
          )}

          {/* Mobile Navigation */}
          {isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <LanguageSwitcher currentLocale={locale} />
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleMobileMenuOpen}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={mobileMenuAnchor}
                open={Boolean(mobileMenuAnchor)}
                onClose={handleMobileMenuClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                {navigationItems.map((item) => (
                  <MenuItem
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                  >
                    {item.label}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        id="home"
        sx={{
          background: "linear-gradient(135deg, #1976d2 0%, #26a69a 100%)",
          color: "white",
          py: { xs: 8, md: 12 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h1"
                gutterBottom
                sx={{
                  fontSize: { xs: "2rem", md: "3rem" },
                  fontWeight: 700,
                  mb: 3,
                }}
              >
                {t("hero.title")}
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  mb: 4,
                  opacity: 0.9,
                  fontSize: { xs: "1.1rem", md: "1.25rem" },
                }}
              >
                {t("hero.subtitle")}
              </Typography>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: "white",
                    color: "primary.main",
                    "&:hover": { bgcolor: "grey.100" },
                    px: 4,
                    py: 1.5,
                  }}
                  startIcon={<CalendarToday />}
                >
                  {t("hero.cta")}
                </Button>
                <Chip
                  icon={<Language />}
                  label={t("hero.online_consultation")}
                  variant="outlined"
                  sx={{
                    color: "white",
                    borderColor: "white",
                    "& .MuiChip-icon": { color: "white" },
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={8}
                sx={{
                  p: 4,
                  background: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(10px)",
                  borderRadius: 3,
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                <Box textAlign="center">
                  <Avatar
                    sx={{
                      width: 100,
                      height: 100,
                      mx: "auto",
                      mb: 2,
                      bgcolor: "rgba(255,255,255,0.2)",
                    }}
                  >
                    <Psychology sx={{ fontSize: 50 }} />
                  </Avatar>
                  <Typography variant="h6" gutterBottom>
                    {t("about.experience")}
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9 }}>
                    {locale === "ar"
                      ? "في مرافقة المرضى نحو الصحة النفسية"
                      : "Dans l'accompagnement vers le bien-être mental"}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* About Section */}
      <Container maxWidth="lg" sx={{ py: 8 }} id="about">
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h2" gutterBottom color="primary">
              {t("title")}
            </Typography>
            <Typography variant="h5" gutterBottom color="secondary">
              {t("about.subtitle")}
            </Typography>
            <Typography variant="body1" paragraph sx={{ mb: 4 }}>
              {t("about.description")}
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Card elevation={2} sx={{ textAlign: "center", p: 2 }}>
                  <Star color="primary" sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="h6" gutterBottom>
                    {locale === "ar" ? "أكثر من 10 سنوات" : "10+ ans"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t("about.experience")}
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card elevation={2} sx={{ textAlign: "center", p: 2 }}>
                  <Psychology color="secondary" sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="h6" gutterBottom>
                    {t("about.approach")}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {locale === "ar" ? "ومتكامل" : "et intégrée"}
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card elevation={2} sx={{ textAlign: "center", p: 2 }}>
                  <Language color="success" sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="h6" gutterBottom>
                    {t("about.languages")}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {locale === "ar" ? "عربية، فرنسية، إنجليزية" : "AR, FR, EN"}
                  </Typography>
                </Card>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card
              elevation={4}
              sx={{
                background: "linear-gradient(135deg, #26a69a 0%, #1976d2 100%)",
                color: "white",
                p: 4,
              }}
            >
              <Typography variant="h5" gutterBottom>
                {locale === "ar" ? "التخصصات" : "Spécialités"}
              </Typography>
              <Box component="ul" sx={{ pl: 0, listStyle: "none" }}>
                {[
                  locale === "ar"
                    ? "إدارة التوتر والقلق"
                    : "Gestion du stress et de l'anxiété",
                  locale === "ar"
                    ? "علاج الاكتئاب"
                    : "Traitement de la dépression",
                  locale === "ar" ? "علاج الأزواج" : "Thérapie de couple",
                  locale === "ar" ? "العلاج الأسري" : "Thérapie familiale",
                  locale === "ar"
                    ? "تطوير تقدير الذات"
                    : "Développement de l'estime de soi",
                ].map((specialty, index) => (
                  <Box
                    key={index}
                    component="li"
                    sx={{ display: "flex", alignItems: "center", mb: 2 }}
                  >
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        bgcolor: "white",
                        mr: 2,
                      }}
                    />
                    <Typography variant="body1">{specialty}</Typography>
                  </Box>
                ))}
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Services Section */}
      <Box sx={{ bgcolor: "background.default", py: 8 }} id="services">
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            textAlign="center"
            gutterBottom
            color="primary"
          >
            {t("services.title")}
          </Typography>
          <Typography
            variant="h6"
            textAlign="center"
            sx={{ mb: 6 }}
            color="text.secondary"
          >
            {t("services.subtitle")}
          </Typography>

          <Grid container spacing={4}>
            {[
              {
                icon: <Psychology />,
                title: t("services.individual.title"),
                description: t("services.individual.description"),
                details: t("services.individual.details"),
                color: "primary",
              },
              {
                icon: <Star />,
                title: t("services.couple.title"),
                description: t("services.couple.description"),
                details: t("services.couple.details"),
                color: "secondary",
              },
              {
                icon: <Language />,
                title: t("services.family.title"),
                description: t("services.family.description"),
                details: t("services.family.details"),
                color: "success",
              },
              {
                icon: <CalendarToday />,
                title: t("services.consultation.title"),
                description: t("services.consultation.description"),
                details: t("services.consultation.details"),
                color: "warning",
              },
            ].map((service, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  elevation={3}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.2s",
                    "&:hover": { transform: "translateY(-4px)" },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: "50%",
                        bgcolor: `${service.color}.light`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mx: "auto",
                        mb: 2,
                      }}
                    >
                      {React.cloneElement(service.icon, {
                        sx: { fontSize: 30, color: `${service.color}.main` },
                      })}
                    </Box>
                    <Typography variant="h6" gutterBottom>
                      {service.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      paragraph
                      color="text.secondary"
                    >
                      {service.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {service.details}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {[
            {
              icon: <Star />,
              title: t("features.professional.title"),
              description: t("features.professional.description"),
            },
            {
              icon: <Security />,
              title: t("features.confidential.title"),
              description: t("features.confidential.description"),
            },
            {
              icon: <Language />,
              title: t("features.accessible.title"),
              description: t("features.accessible.description"),
            },
            {
              icon: <Psychology />,
              title: t("features.multilingual.title"),
              description: t("features.multilingual.description"),
            },
          ].map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box textAlign="center">
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    bgcolor: "primary.light",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 2,
                  }}
                >
                  {React.cloneElement(feature.icon, {
                    sx: { fontSize: 40, color: "white" },
                  })}
                </Box>
                <Typography variant="h6" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Contact Section */}
      <Box sx={{ bgcolor: "background.default", py: 8 }} id="contact">
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            textAlign="center"
            gutterBottom
            color="primary"
          >
            {t("contact.title")}
          </Typography>
          <Typography
            variant="h6"
            textAlign="center"
            sx={{ mb: 6 }}
            color="text.secondary"
          >
            {t("contact.subtitle")}
          </Typography>

          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {[
                  {
                    icon: <Phone />,
                    title: t("contact.phone"),
                    content: "+212 6 XX XX XX XX",
                  },
                  {
                    icon: <Email />,
                    title: t("contact.email"),
                    content: "contact@malikalkhabir.ma",
                  },
                  {
                    icon: <LocationOn />,
                    title: t("contact.address"),
                    content: t("contact.location"),
                  },
                  {
                    icon: <AccessTime />,
                    title: t("contact.hours"),
                    content: t("contact.schedule"),
                  },
                ].map((contact, index) => (
                  <Card key={index} elevation={2}>
                    <CardContent>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <Box
                          sx={{
                            width: 50,
                            height: 50,
                            borderRadius: "50%",
                            bgcolor: "primary.light",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {React.cloneElement(contact.icon, {
                            sx: { color: "white" },
                          })}
                        </Box>
                        <Box>
                          <Typography variant="h6" gutterBottom>
                            {contact.title}
                          </Typography>
                          <Typography variant="body1" color="text.secondary">
                            {contact.content}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>

              <Card
                elevation={3}
                sx={{
                  mt: 3,
                  background:
                    "linear-gradient(135deg, #f44336 0%, #d32f2f 100%)",
                  color: "white",
                }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {locale === "ar"
                      ? "حالات الطوارئ: اتصل بـ 141"
                      : "Urgences: Appelez le 141"}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card elevation={4}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h5" gutterBottom>
                    {locale === "ar" ? "احجز موعدًا" : "Prendre rendez-vous"}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 3 }}
                  >
                    {locale === "ar"
                      ? "املأ النموذج أدناه وسنتواصل معك قريبًا"
                      : "Remplissez le formulaire ci-dessous et nous vous contacterons bientôt"}
                  </Typography>

                  <Box
                    component="form"
                    sx={{ display: "flex", flexDirection: "column", gap: 3 }}
                  >
                    <input
                      type="text"
                      placeholder={t("contact.form.name")}
                      style={{
                        padding: "12px 16px",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        fontSize: "16px",
                      }}
                    />
                    <input
                      type="email"
                      placeholder={t("contact.form.email")}
                      style={{
                        padding: "12px 16px",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        fontSize: "16px",
                      }}
                    />
                    <input
                      type="tel"
                      placeholder={t("contact.form.phone")}
                      style={{
                        padding: "12px 16px",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        fontSize: "16px",
                      }}
                    />
                    <textarea
                      rows={5}
                      placeholder={t("contact.form.message")}
                      style={{
                        padding: "12px 16px",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        fontSize: "16px",
                        resize: "vertical",
                      }}
                    />
                    <Button variant="contained" size="large" sx={{ py: 1.5 }}>
                      {t("contact.form.send")}
                    </Button>
                    <Typography variant="body2" color="text.secondary">
                      {t("contact.form.required")}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: "grey.900", color: "white", py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Dr. Malika Lkhabir
              </Typography>
              <Typography variant="body2" color="grey.400">
                {t("about.subtitle")}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                {locale === "ar" ? "روابط سريعة" : "Liens rapides"}
              </Typography>
              {navigationItems.map((item) => (
                <Typography
                  key={item.id}
                  variant="body2"
                  sx={{
                    color: "grey.400",
                    cursor: "pointer",
                    "&:hover": { color: "white" },
                    display: "block",
                    mb: 1,
                  }}
                  onClick={() => scrollToSection(item.id)}
                >
                  {item.label}
                </Typography>
              ))}
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                {locale === "ar" ? "معلومات قانونية" : "Informations légales"}
              </Typography>
              <Typography variant="body2" color="grey.400" sx={{ mb: 1 }}>
                {t("footer.privacy")}
              </Typography>
              <Typography variant="body2" color="grey.400">
                {t("footer.terms")}
              </Typography>
            </Grid>
          </Grid>
          <Box
            sx={{
              borderTop: "1px solid",
              borderColor: "grey.800",
              mt: 4,
              pt: 4,
              textAlign: "center",
            }}
          >
            <Typography variant="body2" color="grey.400">
              {t("footer.copyright")}
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
