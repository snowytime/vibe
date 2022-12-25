import React from "react";

export interface AvatarProps {
	name?: string;
	src?: string;
	alt?: string;
}
export const Avatar = ({ name, src, alt }: AvatarProps) => {
	return <button>Avatar component...times but why my item...</button>;
};
