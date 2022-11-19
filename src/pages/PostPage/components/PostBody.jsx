import HTMLTagRenderer from "../../../components/HTMLTagRenderer";

export default function PostBody({ postContet }) {
  const multilineContent = postContet.replace(
    /(?:\r\n|\r|\n)/g,
    "<br /> <br />"
  );
  const contentEl = (
    <HTMLTagRenderer allowedTags={["br"]} string={multilineContent} />
  );

  return (
    <div className="post-body mt-4 mx-auto text-center post-width">
      {contentEl}
    </div>
  );
}
