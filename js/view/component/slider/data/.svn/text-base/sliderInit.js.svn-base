/**
 * Created by Galaxy065 on 2017/4/28.
 */
import Utils from "../../../../store/utils";

let SliderJson = {
    slider: () => {
        return [
            {
                title: "首页",
                icon: "left_icon0",
                mainPower: true,
                path: "/"
            },
            {
                title: "业务管理",
                icon: "rk-slider-img left_icon1",
                mainPower: Utils.powerSlider(["项目编辑","特殊编辑","删除项目","搜索项目","添加项目","项目详情","企业编辑","删除企业","搜索企业","添加企业","企业详情","资方编辑","删除资方","搜索资方","添加资方","资方详情","机构编辑","机构删除","搜索机构","添加机构","机构详情","搜索业务","添加业务","业务详情","删除业务"]),
                children: [
                    {
                        label: "项目管理",
                        activeOnlyWhenExact: false,
                        path: "/projectManagement",
                        isPower: Utils.powerSlider(["项目编辑","特殊编辑","删除项目","搜索项目","添加项目","项目详情"])
                    },
                    {
                        label: "企业管理",
                        activeOnlyWhenExact: false,
                        path: "/enterpriseManagement",
                        isPower: Utils.powerSlider(["企业编辑","删除企业","搜索企业","添加企业","企业详情"])
                    },
                    {
                        label: "投资人管理",
                        activeOnlyWhenExact: false,
                        path: "/investorManagement",
                        isPower: Utils.powerSlider(["投资人编辑","删除投资人","搜索投资人","添加投资人","投资人详情"])
                    },
                    {
                        label: "投资机构管理",
                        activeOnlyWhenExact: false,
                        path: "/agencyManagement",
                        isPower: Utils.powerSlider(["机构编辑","机构删除","搜索机构","添加机构","机构详情"])
                    },
                    {
                        label: "业务活动管理",
                        activeOnlyWhenExact: false,
                        path: "/businessManagement",
                        isPower: Utils.powerSlider(["搜索业务","添加业务","业务详情","删除业务"])
                    }
                ]
            },
            {
                title: "内部管理",
                icon: "rk-slider-img left_icon3",
                mainPower: Utils.powerSlider(["搜索角色", "添加角色", "角色详情", "修改角色", "删除角色", "搜索员工", "删除员工", "修改员工", "添加员工", "搜索账户", "锁户操作", "重置密码", "搜索标签", "添加标签", "删除标签", "合并标签", "标签详情", "修改标签"]),
                children: [
                    {
                        label: "角色管理",
                        activeOnlyWhenExact: false,
                        path: "/roleManagement",
                        isPower: Utils.powerSlider(["搜索角色", "添加角色", "角色详情", "修改角色", "删除角色"])
                    },
                    {
                        label: "员工管理",
                        activeOnlyWhenExact: false,
                        path: "/staffManagement",
                        isPower: Utils.powerSlider(["搜索员工", "删除员工", "修改员工", "添加员工"])
                    },
                    {
                        label: "账户管理",
                        activeOnlyWhenExact: false,
                        path: "/accountManagement",
                        isPower: Utils.powerSlider(["搜索账户", "锁户操作", "重置密码"])
                    },
                    {
                        label: "标签管理",
                        activeOnlyWhenExact: false,
                        path: "/tagManagement",
                        isPower: Utils.powerSlider(["搜索标签", "添加标签", "删除标签", "合并标签", "标签详情", "修改标签"])
                    }
                ]
            }
        ]
    }
};

export default SliderJson;