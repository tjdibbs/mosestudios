import Dolapo from "@assets/dolapo.jpg";
import CEO from "@assets/ceo.jpg";
import Ayoodola from "@assets/ayodola.jpg";
import ProductDesigner from "@assets/product-designer.jpg";
import Okeke from "@assets/okeke.jpg";
import Mercy from "@assets/mercy.jpg";
import Omowumi from "@assets/omowumi.jpg";

export const teamMembers = [
  {
    name: "MOSES OMOBOLAJI",
    role: "founder/creative director",
    image: CEO,
    description: (
      <div className="description mb-6">
        <p>
          My name is Moses Omobolaji. I have been a Digital artist since 2014
          with a background in 3D Animation as well as still and motion
          Graphics.
        </p>
        <p className="mt-4">
          I have worked in two animation studios in Nigeria. I am currently the
          Director and Producer of my debut short film, New Age, set to be
          released in 2024. Of course, you will find me having fun with my
          friends, gaming or going on vacations.
        </p>
      </div>
    ),
  },
  {
    name: "AYODOLA OLUSOGA",
    role: "Financial Manager",
    image: Ayoodola,
    description: (
      <p>
        I am an Accountant with a knack for words. I have worked with numbers
        and words for more than three years. I enjoy using stories to make sound
        decisions for any organisation through numbers. Sounds interesting,
        yeah? In my past time, you will find my pen like that of a ready writer
        or my nose in a good book. I didn't forget to add that creativity makes
        me spark.😊
      </p>
    ),
  },
  {
    name: "OKEKE CHIMEZE",
    role: "Character animator",
    description: (
      <p>
        I am a professional character animator. I am very simple and focused,
        constantly striving to improve and love to get the job done.
      </p>
    ),
    image: Okeke,
  },
  {
    name: "TOBILOBA ADEKUNLE",
    role: "Product Designer",
    description: <p>I am a professional 3d artist from Planet Earth</p>,
    image: ProductDesigner,
  },

  {
    name: "OLAOPA DOLAPO",
    role: "COMMUNICATIONS MANAGER",
    description: (
      <p>
        Olaopa Dolapo is an experienced Communications Manager with a background
        in content strategy, collaborations, and email marketing. She is a
        digital success catalyst, driving engagement and results.
      </p>
    ),
    image: Dolapo,
  },
  {
    name: "MERCY IMMANUEL",
    role: "Marketing Copywriter",
    description: (
      <p>
        Mercy Immanuel is a skilled Marketing Copywriter with an expertise in
        content creation and social media management. Through compelling
        narratives and strategic storytelling, I drive audience engagement and
        boost sales, delivering tangible results to elevate your digital
        presence.
      </p>
    ),
    image: Mercy,
  },
  {
    name: "OMOWUMi ANIFOWOSE",
    role: "HR/Secretary",
    description: (
      <p>
        I am motivated, adaptive, responsible and ambitious professional in
        administrative duties with exceptional interpersonal skills.
      </p>
    ),
    image: Omowumi,
  },
];

export enum STATUS {
  OK = 200,
  CREATED = 201,
  ACCEPTED,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  PAYMENT_REQUIRED = 402,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export const serverErrors: { [x: number]: string } = {
  500: "INTERNAL_SERVER_ERROR",
  404: "NOT_FOUND",
  401: "UNAUTHORIZED",
  403: "FORBIDDEN",
  400: "BAD_REQUEST",
};

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;
export const SECRET_KEY = process.env.SECRET_KEY as string;

export enum Urls {
  login = "/auth/login",
  register = "/auth/register",
  validateEmail = "/auth/validate-email",
  forgotPassword = "/auth/forgot-password",
  resetPassword = "/auth/reset-password",
  sendCode = "/auth/one-time-password",
  getSessionUser = "/auth/get-session-user",

  content = "/content",
  aggregate = "/aggregate",
  getUser = "/users",
  getAffiliates = "/affiliates",

  contact = "/contact",
  affiliate = "/affiliate",
}

export const config = {
  baseUrl: BASE_URL,
  urls: Urls,
};

export const appealingMessage =
  "It us, we are working on it... Please check back after 20mins";
