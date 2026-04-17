import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Bell, ChevronRight, Mail, MapPin, ScanLine, Utensils, X } from "lucide-react-native";
import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CraveButton from "@/components/CraveButton";
import Colors from "@/constants/colors";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const TOTAL_PAGES = 4;

export default function Onboarding() {
  const [currentPage, setCurrentPage] = useState(0);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const scrollX = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const buttonSlide = useRef(new Animated.Value(50)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;

  // Initial animations for welcome page
  React.useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(buttonSlide, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(buttonOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  const animateToPage = (nextPage: number) => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: -30,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setCurrentPage(nextPage);
      slideAnim.setValue(30);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 50,
          friction: 10,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const handleNext = () => {
    if (currentPage < TOTAL_PAGES - 1) {
      animateToPage(currentPage + 1);
    }
  };

  const handleSkip = () => {
    animateToPage(currentPage + 1);
  };

  const validateEmail = (text: string) => {
    setEmail(text);
    if (text && !text.toLowerCase().endsWith("@ufl.edu")) {
      setEmailError("Please use your @ufl.edu email");
    } else {
      setEmailError("");
    }
  };

  const handleSignUp = () => {
    if (email.toLowerCase().endsWith("@ufl.edu")) {
      router.replace("/(tabs)");
    } else {
      setEmailError("Please use your @ufl.edu email");
    }
  };

  const renderDots = () => (
    <View style={styles.dotsContainer}>
      {Array.from({ length: TOTAL_PAGES }).map((_, index) => (
        <Animated.View
          key={index}
          style={[
            styles.dot,
            {
              backgroundColor:
                currentPage === index ? Colors.orange : "rgba(255,107,0,0.3)",
              width: currentPage === index ? 24 : 8,
            },
          ]}
        />
      ))}
    </View>
  );

  const renderWelcomePage = () => (
    <View style={styles.pageContainer}>
      <View style={styles.welcomeContent}>
        <Animated.View
          style={[
            styles.logoContainer,
            {
              transform: [{ scale: logoScale }],
              opacity: logoOpacity,
            },
          ]}
        >
          <Image
            source={{
              uri: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/crave%20logo%20white.PNG-lZcrIHZbqzE7Mt7aXw88WU95M3jyko.png",
            }}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.taglineWelcome}>Ditch the lines.</Text>
          <Text style={styles.subtitleWelcome}>Tap. Eat. Done.</Text>
        </Animated.View>
      </View>
      <Animated.View
        style={[
          styles.welcomeButtonContainer,
          {
            transform: [{ translateY: buttonSlide }],
            opacity: buttonOpacity,
          },
        ]}
      >
        <CraveButton
          label="Get Started"
          variant="dark"
          onPress={handleNext}
          style={styles.fullWidthButton}
          testId="get-started"
        />
      </Animated.View>
    </View>
  );

  const renderHowItWorksPage = () => (
    <Animated.View
      style={[
        styles.pageContainer,
        {
          opacity: fadeAnim,
          transform: [{ translateX: slideAnim }],
        },
      ]}
    >
      <View style={styles.howItWorksTop}>
        <Text style={styles.pageTitle}>How It Works</Text>
        <Text style={styles.pageSubtitle}>
          Save on meals in just three easy steps
        </Text>
      </View>

      <View style={styles.stepsContainer}>
        <StepCard
          number="1"
          icon={<Utensils size={28} color={Colors.white} />}
          title="Choose Your Plan"
          description="Select from flexible credit packages tailored to your dining habits and budget."
          delay={0}
        />
        <StepCard
          number="2"
          icon={<MapPin size={28} color={Colors.white} />}
          title="Browse Restaurants"
          description="Discover local restaurants on and around campus that accept Crave credits."
          delay={100}
        />
        <StepCard
          number="3"
          icon={<ScanLine size={28} color={Colors.white} />}
          title="Tap to Pay"
          description="Use your credits at participating restaurants and enjoy instant savings."
          delay={200}
        />
      </View>

      <View style={styles.bottomButtonContainer}>
        <CraveButton
          label="Continue"
          variant="dark"
          onPress={handleNext}
          style={styles.fullWidthButton}
        />
      </View>
    </Animated.View>
  );

  const renderNotificationsPage = () => (
    <Animated.View
      style={[
        styles.pageContainer,
        {
          opacity: fadeAnim,
          transform: [{ translateX: slideAnim }],
        },
      ]}
    >
      <Pressable style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </Pressable>

      <View style={styles.centerContent}>
        <View style={styles.iconCircle}>
          <Bell size={48} color={Colors.orange} />
        </View>
        <Text style={styles.notifTitle}>Stay in the Loop</Text>
        <Text style={styles.notifSubtitle}>
          Get notified about new restaurant deals, credit bonuses, and exclusive
          offers for Gators.
        </Text>
      </View>

      <View style={styles.bottomButtonContainer}>
        <CraveButton
          label="Enable Notifications"
          variant="primary"
          onPress={handleNext}
          style={styles.fullWidthButton}
        />
        <Pressable onPress={handleSkip} style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Maybe Later</Text>
        </Pressable>
      </View>
    </Animated.View>
  );

  const renderSignUpPage = () => (
    <Animated.View
      style={[
        styles.pageContainer,
        {
          opacity: fadeAnim,
          transform: [{ translateX: slideAnim }],
        },
      ]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.signUpInner}>
            <View style={styles.signUpTop}>
              <View style={styles.emailIconCircle}>
                <Mail size={40} color={Colors.orange} />
              </View>
              <Text style={styles.signUpTitle}>Join Crave</Text>
              <Text style={styles.signUpSubtitle}>
                Sign up with your UF email to get started
              </Text>

              <View style={styles.inputContainer}>
                <Mail
                  size={20}
                  color={email ? Colors.orange : Colors.slate}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.emailInput}
                  placeholder="gator@ufl.edu"
                  placeholderTextColor={Colors.slate}
                  value={email}
                  onChangeText={validateEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                {email.length > 0 && (
                  <Pressable onPress={() => setEmail("")} style={styles.clearButton}>
                    <X size={18} color={Colors.slate} />
                  </Pressable>
                )}
              </View>
              {emailError ? (
                <Text style={styles.errorText}>{emailError}</Text>
              ) : null}

              <View style={styles.ufBadge}>
                <Text style={styles.ufBadgeText}>
                  Exclusive for University of Florida students
                </Text>
              </View>
            </View>

            <View style={styles.bottomButtonContainer}>
              <CraveButton
                label="Create Account"
                variant="primary"
                onPress={handleSignUp}
                style={styles.fullWidthButton}
                disabled={!email || !!emailError}
              />
              <Pressable
                onPress={() => router.replace("/(tabs)")}
                style={styles.secondaryButton}
              >
                <Text style={styles.secondaryButtonText}>
                  Already have an account? Sign In
                </Text>
              </Pressable>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Animated.View>
  );

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 0:
        return renderWelcomePage();
      case 1:
        return renderHowItWorksPage();
      case 2:
        return renderNotificationsPage();
      case 3:
        return renderSignUpPage();
      default:
        return renderWelcomePage();
    }
  };

  return (
    <LinearGradient
      colors={currentPage === 0 ? [Colors.orange, "#FF4F00"] : [Colors.white, Colors.cream]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
        {currentPage > 0 && renderDots()}
        {renderCurrentPage()}
      </SafeAreaView>
    </LinearGradient>
  );
}

function StepCard({
  number,
  icon,
  title,
  description,
  delay,
}: {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}) {
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.sequence([
      Animated.delay(delay),
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.stepCard,
        {
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim,
        },
      ]}
    >
      <View style={styles.stepIconContainer}>{icon}</View>
      <View style={styles.stepContent}>
        <View style={styles.stepHeader}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>{number}</Text>
          </View>
          <Text style={styles.stepTitle}>{title}</Text>
        </View>
        <Text style={styles.stepDescription}>{description}</Text>
      </View>
      <ChevronRight size={20} color={Colors.slate} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safe: { flex: 1, paddingHorizontal: 24 },
  pageContainer: { flex: 1 },
  
  // Dots
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    gap: 8,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },

  // Welcome Page
  welcomeContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 80,
    marginBottom: 20,
  },
  taglineWelcome: {
    color: Colors.white,
    fontSize: 28,
    fontWeight: "800",
    marginTop: 10,
  },
  subtitleWelcome: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 8,
  },
  welcomeButtonContainer: {
    paddingBottom: 20,
  },

  // How It Works Page
  howItWorksTop: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: "900",
    color: Colors.ink,
    textAlign: "center",
  },
  pageSubtitle: {
    fontSize: 16,
    color: Colors.slate,
    textAlign: "center",
    marginTop: 8,
  },
  stepsContainer: {
    flex: 1,
    justifyContent: "center",
    gap: 16,
  },
  stepCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  stepIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: Colors.orange,
    alignItems: "center",
    justifyContent: "center",
  },
  stepContent: {
    flex: 1,
  },
  stepHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  stepNumber: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#FFF1E6",
    alignItems: "center",
    justifyContent: "center",
  },
  stepNumberText: {
    fontSize: 12,
    fontWeight: "800",
    color: Colors.orange,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: Colors.ink,
  },
  stepDescription: {
    fontSize: 13,
    color: Colors.slate,
    lineHeight: 18,
  },

  // Notifications Page
  skipButton: {
    alignSelf: "flex-end",
    padding: 8,
  },
  skipText: {
    color: Colors.slate,
    fontSize: 16,
    fontWeight: "600",
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#FFF1E6",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  notifTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: Colors.ink,
    textAlign: "center",
    marginBottom: 12,
  },
  notifSubtitle: {
    fontSize: 16,
    color: Colors.slate,
    textAlign: "center",
    lineHeight: 24,
  },

  // Sign Up Page
  keyboardView: {
    flex: 1,
  },
  signUpInner: {
    flex: 1,
    justifyContent: "space-between",
  },
  signUpTop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emailIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#FFF1E6",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  signUpTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: Colors.ink,
    textAlign: "center",
    marginBottom: 8,
  },
  signUpSubtitle: {
    fontSize: 16,
    color: Colors.slate,
    textAlign: "center",
    marginBottom: 32,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Colors.line,
    paddingHorizontal: 16,
    width: "100%",
    height: 56,
  },
  inputIcon: {
    marginRight: 12,
  },
  emailInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.ink,
    fontWeight: "600",
  },
  clearButton: {
    padding: 4,
  },
  errorText: {
    color: "#E53935",
    fontSize: 13,
    marginTop: 8,
    fontWeight: "600",
  },
  ufBadge: {
    backgroundColor: "#FFF1E6",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginTop: 24,
  },
  ufBadgeText: {
    color: Colors.orange,
    fontSize: 13,
    fontWeight: "700",
  },

  // Buttons
  bottomButtonContainer: {
    paddingBottom: 20,
  },
  fullWidthButton: {
    width: "100%",
  },
  secondaryButton: {
    paddingVertical: 16,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: Colors.slate,
    fontSize: 15,
    fontWeight: "600",
  },
});
