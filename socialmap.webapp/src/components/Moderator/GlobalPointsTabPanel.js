import React, {useEffect, useState} from "react";
import {Button} from "@chakra-ui/react";
import BaseTabPanel from "../UserPanel/Tabs/BaseTabPanel";
import {POIToAcceptMock} from "../../mocks/POIToAcceptMock";
import PointBox from "./PointBox";
import {getPois} from "../../socialMapApi/poiRequests";

export default function GlobalPointsTabPanel() {
    const [isLoading, setIsLoading] = useState(true);
    const [fetchedGlobalPoints, setFetchedGlobalPoints] = useState([]);
    const [filteredGlobalPoints, setFilteredGlobalPoints] = useState([]);

    useEffect(() => {
        const ac = new AbortController();
        (async () => {
            //console.log("send req " + "cat tab panel");
            const res = await getPois(ac.signal, null, true, true).catch(console.error);
            //const res = {ok: true, data: POIToAcceptMock};
            if (res?.ok) {
                //console.log("get req " + props.searchPlaceholder)
                setFetchedGlobalPoints(res.data);
                setFilteredGlobalPoints(res.data);
                setIsLoading(false);
            }
        })();
        return () => {
            ac.abort("unm ");
            //console.log("unmount ");
        };
    }, []);

    const filter = (input) => {
        const filtered = fetchedGlobalPoints.filter(x => x.name.toLowerCase().includes(input.toLowerCase()) || x.id == input);
        setFilteredGlobalPoints(filtered);
    }

    const onGlobalPointRemove = (id) => {
        const withoutDeleted = fetchedGlobalPoints.filter(x => x.id !== id)
        setFetchedGlobalPoints(withoutDeleted);
        const withoutDeletedFiltered = filteredGlobalPoints.filter(x => x.id !== id)
        setFilteredGlobalPoints(withoutDeletedFiltered);
    }

    const globalPoints = (list) => {
        return list.map((p) =>
            <PointBox
                key={p.id}
                id={p.id}
                name={p.name}
                author={p.creatorName}
                category={p.categories.length > 0 ? p.categories[0].name : "no category"}
                x={p.x}
                y={p.y}
                description={p.description}
                onGlobalPointRemove={onGlobalPointRemove}
                pointType="existing"
            />
        );
    }

    return (
        <React.Fragment>
            {isLoading ? (
                    <Button width={"100%"} isLoading={true}></Button>
                ) : (
                    <BaseTabPanel
                        filteredData={filteredGlobalPoints}
                        searchPlaceholder={"point name or id"}
                        filterData={filter}
                        createDataComponentList={globalPoints}
                    />
                )
            }
        </React.Fragment>
    );
}