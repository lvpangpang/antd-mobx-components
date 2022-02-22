import { Menu } from "antd";
import { observer } from "mobx-react-lite";
import store from "./store";
const { SubMenu } = Menu;
const { Item } = Menu;

export const TopNav = observer((props) => {
  const { menuConfig = [] } = props;
  const handleClick = (e) => {
    const id = e.key;
    store.setTopId(id);
    store.setSideNavMenu(
      menuConfig.filter((item) => {
        return item.id == id;
      })[0]?.children
    );
  };

  return (
    <Menu mode="horizontal" theme="dark">
      {menuConfig.map((item) => {
        return (
          <Item
            key={item.id}
            onClick={handleClick}
            style={{ height: 64, lineHeight: "64px" }}
          >
            {item.title}
          </Item>
        );
      })}
    </Menu>
  );
});

function loopNav(sideNavMenu) {
  return sideNavMenu.map((item) => {
    if (item.children) {
      return (
        <SubMenu openKeys={item.id} title={item.title} key={item.id}>
          {loopNav(item.children)}
        </SubMenu>
      );
    }
    return <Item key={item.id}>{item.title}</Item>;
  });
}

export const SiderNav = observer(() => {
  const { sideNavMenu } = store;
  return <Menu mode="inline">{loopNav(sideNavMenu)}</Menu>;
});

export function Center() {
  return <div>内容</div>;
}
