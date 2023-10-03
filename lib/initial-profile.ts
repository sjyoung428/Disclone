import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { isKoreanName } from "@/lib/is-korean-name";

export const initialProfile = async () => {
  const user = await currentUser();

  if (!user) {
    return redirectToSignIn();
  }

  const profile = await db.profile.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (profile) {
    return profile;
  }

  const isKorean = isKoreanName(user.firstName || "");

  const newProfile = await db.profile.create({
    data: {
      userId: user.id,
      // name: `${user.lastName} ${user.firstName}`,
      name: isKorean
        ? `${user.lastName} ${user.firstName}`
        : `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  });

  return newProfile;
};
