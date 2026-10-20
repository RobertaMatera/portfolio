import Icon from "@/components/ui/Icon/Icon";

interface NextSectionLinkProps {
  /** Id of the section to scroll to. */
  target: string;
}

/**
 * Bobbing arrow at the foot of a section that jumps to the next one. A pointer
 * shortcut only: keyboard and screen reader users have the dock, so it stays
 * out of the tab order and the accessibility tree.
 */
export default function NextSectionLink({ target }: NextSectionLinkProps) {
  return (
    <a className="next-section" href={`#${target}`} tabIndex={-1} aria-hidden="true">
      <Icon name="chevronDown" />
    </a>
  );
}
