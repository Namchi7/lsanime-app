import { StyledText, StyledView, StyledImage } from "@/components/NativeStyled";

export interface TabBarIconType {
  icon: any;
  color: string;
  name: string;
  focused: boolean;
}

const TabBarIcon: React.FC<TabBarIconType> = ({
  icon,
  color,
  name,
  focused,
}) => {
  return (
    <StyledView className="justify-center items-center gap-2">
      <StyledImage
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />

      <StyledText
        className={`text-xs ${focused ? "font-semibold" : "font-regular"} `}
        style={{ color: color }}
      >
        {name}
      </StyledText>
    </StyledView>
  );
};

export default TabBarIcon;
