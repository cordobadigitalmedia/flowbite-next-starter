import { transformToEmbedUrl } from "@/lib/utils/parser";
import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import { MDXRemote } from "next-mdx-remote/rsc";
import { VideoPlayer } from "./iframe-video";

interface Props {
  href?: string;
  children?: React.ReactNode;
}

interface CustomMDXProps extends MDXRemoteProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  components?: { [key: string]: React.ComponentType<any> };
}

const components = {
  a: (props: Props) => {
    const { href } = props;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const embedURL = transformToEmbedUrl(href!);
    if (href) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return <VideoPlayer url={embedURL!} />;
    } else {
      return <a {...props}>{props.children}</a>;
    }
  },
};

export function CustomMDX(props: CustomMDXProps) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
