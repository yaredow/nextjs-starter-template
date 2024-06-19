import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";
import { Tailwind } from "@react-email/tailwind";

interface WelcomeEmailProps {
  firstName: string;
}

const baseUrl = process.env.BASE_URL;

export default function WelcomeEmail({ firstName }: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Konjo Habesha Fashion</Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="items-center rounded-lg border border-gray-300 p-4 shadow-lg">
            <Img
              src="https://res.cloudinary.com/diqgie9yt/image/upload/v1716035067/konjo-habesha/logo_ktkdhl.png"
              width="50"
              height="50"
              alt="Konjo Habesha Fashion Logo"
              className="mx-auto flex items-center justify-center"
            />
            <Text className="text-lg">Dear {firstName},</Text>
            <Text className="text-normal">
              Welcome to Konjo Habesha Fashion! We are delighted to have you
              with us. Our online store offers a unique collection of
              traditional Habesha garments, each piece reflecting the rich
              cultural heritage, beauty, and resilience of our people. We invite
              you to explore our collection, discover the stories behind each
              garment, and connect with your roots through our authentic pieces.
            </Text>
            <Section className="text-center">
              <Button
                className="rounded-md bg-blue-500 px-4 py-[10px] text-white"
                href={`${baseUrl}/shop`}
              >
                Start Shopping
              </Button>
            </Section>
            <Text className="text-lg">
              Best regards,
              <br />
              The Konjo Habesha Team
            </Text>
            <Hr className="border-2" />
            <Text className="text-normal bg-background/20">
              Addis Ababa, Shiromeda
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
