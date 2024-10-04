import { SystemProps } from "@chakra-ui/styled-system"
import { forwardRef, PropsOf } from "../system"
import { cx } from "@chakra-ui/utils"
import { HTMLAttributes, ReactElement } from "react"
import { MenuIcon } from "./menu-icon"
import { MenuItemProps } from "./menu-item"
import { StyledMenuItem } from "./styled-menu-item"
import { useMenuOption, UseMenuOptionOptions } from "./use-menu"

const CheckIcon: React.FC<PropsOf<"svg">> = (props) => (
  <svg viewBox="0 0 14 14" width="1em" height="1em" {...props}>
    <polygon
      fill="currentColor"
      points="5.5 11.9993304 14 3.49933039 12.5 2 5.5 8.99933039 1.5 4.9968652 0 6.49933039"
    />
  </svg>
)

export interface MenuItemOptionProps
  extends UseMenuOptionOptions,
    Omit<MenuItemProps, keyof UseMenuOptionOptions | "icon"> {
  /**
   * @type React.ReactElement
   */
  icon?: ReactElement | null
  /**
   * @type SystemProps["mr"]
   */
  iconSpacing?: SystemProps["mr"]
  /**
   * The placement of the icon in the option
   * @default start
   */
  iconPlacement?: "start" | "end"
}

export const MenuItemOption = forwardRef<MenuItemOptionProps, "button">(
  (props, ref) => {
    // menu option item should always be `type=button`, so we omit `type`
    const {
      icon,
      iconSpacing = "0.75rem",
      iconPlacement = "start",
      ...rest
    } = props

    const optionProps = useMenuOption(rest, ref) as HTMLAttributes<HTMLElement>

    return (
      <StyledMenuItem
        {...optionProps}
        className={cx("chakra-menu__menuitem-option", rest.className)}
      >
        {icon !== null && iconPlacement === "start" && (
          <MenuIcon
            fontSize="0.8em"
            marginEnd={iconSpacing}
            opacity={props.isChecked ? 1 : 0}
          >
            {icon || <CheckIcon />}
          </MenuIcon>
        )}
        <span style={{ flex: 1 }}>{optionProps.children}</span>
        {icon !== null && iconPlacement === "end" && (
          <MenuIcon
            fontSize="0.8em"
            marginStart={iconSpacing}
            opacity={props.isChecked ? 1 : 0}
          >
            {icon || <CheckIcon />}
          </MenuIcon>
        )}
      </StyledMenuItem>
    )
  },
)

MenuItemOption.id = "MenuItemOption"

MenuItemOption.displayName = "MenuItemOption"
