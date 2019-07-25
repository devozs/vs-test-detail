import * as React from "react";
import { ScrollableList, IListItemDetails, ListSelection, ListItem } from "azure-devops-ui/List";
import { ArrayItemProvider, IItemProvider } from "azure-devops-ui/Utilities/Provider";
import { Icon, IconSize } from "azure-devops-ui/Icon";
import { Card } from "azure-devops-ui/Card";
import { NunitTestCase } from "../documents/nunit";

export interface ITaskItem {
    value: string;
    iconName: string;
    name: string;
}

interface TestCasePropertiesListProps {
    testCase: NunitTestCase
}

interface TestCasePropertiesListState {
    properties: IItemProvider<any>
}

export default class TestCasePropertiesList extends React.Component<TestCasePropertiesListProps, TestCasePropertiesListState>  {
    private selection = new ListSelection(true);
    private 

    constructor(props) {
        super(props);
        
        let propertiesList: ITaskItem[] = [
            {
                value: props.testCase.name,
                iconName: "Home",
                name: "Name"
            },
            {
                value: props.testCase.methodName,
                iconName: "Home",
                name: "Method"
            },
            {
                value: props.testCase.className,
                iconName: "Home",
                name: "Class"
            },
            {
                value: props.testCase.seed,
                iconName: "Home",
                name: "Seed"
            },
        ];
        this.state = { 
            properties: new ArrayItemProvider(propertiesList)
        }
    }

    public render(): JSX.Element {
        return (
            <Card>
                <div style={{ display: "flex", height: "300px" }}>
                    <ScrollableList
                        itemProvider={this.state.properties}
                        renderRow={this.renderRow}
                        selection={this.selection}
                        width="100%"
                    />
                </div>
            </Card>
        );
    }

    private renderRow = (
        index: number,
        item: ITaskItem,
        details: IListItemDetails<ITaskItem>,
        key?: string
    ): JSX.Element => {
        return (
            <ListItem key={key || "list-item" + index} index={index} details={details}>
                <div className="list-example-row flex-row h-scroll-hidden">
                    <Icon iconName={item.iconName} size={IconSize.medium} />
                    <div
                        style={{ marginLeft: "10px", padding: "10px 0px" }}
                        className="flex-column h-scroll-hidden"
                    >
                        <span className="text-ellipsis">{item.name}</span>
                        <span className="fontSizeMS font-size-ms text-ellipsis secondary-text">
                            {item.value}
                        </span>
                    </div>
                </div>
            </ListItem>
        );
    };
}