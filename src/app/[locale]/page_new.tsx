"use client";
import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
  Rating,
  TextField,
  Avatar,
} from "@mui/material";
import {
  Psychology,
  Phone,
  Email,
  LocationOn,
  AccessTime,
  Star,
  Security,
  Language,
  Menu,
  CalendarToday,
} from "@mui/icons-material";
import Image from "next/image";
import React from "react";
interface HomeProps {
  params: Promise<{ locale: string }>;
}

export default function Home({ params }: HomeProps) {
  const [locale, setLocale] = useState<string>("fr");
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    params.then(({ locale: paramLocale }) => {
      setLocale(paramLocale);
    });
  }, [params]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const t = {
    fr: {
      title: "Dr. Malika Lkhabir - Psychologue Clinicienne",
      subtitle: "Votre bien-être mental, notre priorité",
      about: "À Propos",
      services: "Services",
      contact: "Contact",
      book: "Prendre RDV",
      experience: "15+ années d'expérience",
      patients: "500+ patients aidés",
      specialties: "Spécialités multiples",
      aboutText:
        "Je suis une psychologue clinicienne dédiée à accompagner chacun vers un mieux-être psychologique et émotionnel.",
      therapy: "Thérapie Individuelle",
      family: "Thérapie Familiale",
      couples: "Thérapie de Couple",
      address: "123 Rue de la Paix, Casablanca",
      phone: "+212 6 12 34 56 78",
      email: "contact@malikalkhabir.ma",
    },
    ar: {
      title: "د. مليكة الخبير - أخصائية نفسية إكلينيكية",
      subtitle: "صحتكم النفسية، أولويتنا",
      about: "حول",
      services: "الخدمات",
      contact: "اتصال",
      book: "حجز موعد",
      experience: "أكثر من 15 سنة خبرة",
      patients: "أكثر من 500 مريض",
      specialties: "تخصصات متعددة",
      aboutText:
        "أنا أخصائية نفسية إكلينيكية مكرسة لمساعدة كل شخص نحو تحسين صحته النفسية والعاطفية.",
      therapy: "العلاج الفردي",
      family: "العلاج الأسري",
      couples: "علاج الأزواج",
      address: "123 شارع السلام، الدار البيضاء",
      phone: "+212 6 12 34 56 78",
      email: "contact@malikalkhabir.ma",
    },
  };

  const currentT = t[locale as keyof typeof t] || t.fr;

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Dr. Malika Lkhabir
      </Typography>
      <List>
        {[currentT.about, currentT.services, currentT.contact].map((text) => (
          <ListItem key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* AppBar */}
      <AppBar position="static" color="primary">
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
            <Image
              src="/logo_large.svg"
              alt="Dr. Malika Lkhabir"
              width={276}
              height={31}
              style={{ maxWidth: "200px", height: "auto" }}
            />
          </Box>
          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <Menu />
            </IconButton>
          ) : (
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button color="inherit">{currentT.about}</Button>
              <Button color="inherit">{currentT.services}</Button>
              <Button color="inherit">{currentT.contact}</Button>
              <Button variant="contained" color="secondary">
                {currentT.book}
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
        }}
      >
        {drawer}
      </Drawer>

      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #1976d2 0%, #26a69a 100%)",
          color: "white",
          py: 8,
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h1" gutterBottom>
                {currentT.title}
              </Typography>
              <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
                {currentT.subtitle}
              </Typography>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  startIcon={<CalendarToday />}
                >
                  {currentT.book}
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{ color: "white", borderColor: "white" }}
                >
                  {currentT.about}
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: "center" }}>
                <Psychology sx={{ fontSize: 200, opacity: 0.8 }} />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* About Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h2" gutterBottom color="primary">
              {currentT.about}
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, fontSize: "1.1rem" }}>
              {currentT.aboutText}
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <Card>
                  <CardContent sx={{ textAlign: "center" }}>
                    <AccessTime color="primary" sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="h6">{currentT.experience}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card>
                  <CardContent sx={{ textAlign: "center" }}>
                    <Star color="primary" sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="h6">{currentT.patients}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card>
                  <CardContent sx={{ textAlign: "center" }}>
                    <Security color="primary" sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="h6">{currentT.specialties}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: "center" }}>
              <Avatar
                sx={{
                  width: 300,
                  height: 300,
                  mx: "auto",
                  bgcolor: "primary.light",
                }}
              >
                <Psychology sx={{ fontSize: 150 }} />
              </Avatar>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Services Section */}
      <Box sx={{ bgcolor: "grey.50", py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            textAlign="center"
            gutterBottom
            color="primary"
          >
            {currentT.services}
          </Typography>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Psychology color="primary" sx={{ fontSize: 60, mb: 2 }} />
                  <Typography variant="h5" gutterBottom>
                    {currentT.therapy}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Séances individuelles personnalisées pour votre bien-être
                    mental.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    En savoir plus
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Language color="primary" sx={{ fontSize: 60, mb: 2 }} />
                  <Typography variant="h5" gutterBottom>
                    {currentT.family}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Accompagnement familial pour améliorer les relations.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    En savoir plus
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Security color="primary" sx={{ fontSize: 60, mb: 2 }} />
                  <Typography variant="h5" gutterBottom>
                    {currentT.couples}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Thérapie de couple pour renforcer votre relation.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    En savoir plus
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Contact Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h2"
          textAlign="center"
          gutterBottom
          color="primary"
        >
          {currentT.contact}
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Informations de contact
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <LocationOn color="primary" sx={{ mr: 2 }} />
                  <Typography>{currentT.address}</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Phone color="primary" sx={{ mr: 2 }} />
                  <Typography>{currentT.phone}</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Email color="primary" sx={{ mr: 2 }} />
                  <Typography>{currentT.email}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Prendre rendez-vous
                </Typography>
                <Box component="form" sx={{ mt: 2 }}>
                  <TextField
                    fullWidth
                    label="Nom complet"
                    margin="normal"
                    required
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    margin="normal"
                    required
                  />
                  <TextField
                    fullWidth
                    label="Téléphone"
                    margin="normal"
                    required
                  />
                  <TextField
                    fullWidth
                    label="Message"
                    multiline
                    rows={4}
                    margin="normal"
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                  >
                    Envoyer
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Box sx={{ bgcolor: "primary.main", color: "white", py: 4 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Dr. Malika Lkhabir
              </Typography>
              <Typography variant="body2">
                Psychologue clinicienne diplômée avec plus de 15 ans
                d'expérience.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Contact
              </Typography>
              <Typography variant="body2">{currentT.phone}</Typography>
              <Typography variant="body2">{currentT.email}</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Horaires
              </Typography>
              <Typography variant="body2">Lun - Ven: 9h - 18h</Typography>
              <Typography variant="body2">Sam: 9h - 13h</Typography>
            </Grid>
          </Grid>
          <Box
            sx={{
              textAlign: "center",
              mt: 4,
              pt: 4,
              borderTop: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <Typography variant="body2">
              © 2024 Dr. Malika Lkhabir. Tous droits réservés.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
