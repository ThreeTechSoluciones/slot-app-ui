import type { CalendarResponse } from "../../app/types/responses/CalendarResponse.type";

export const calendarMock: CalendarResponse = {

    "days": [
        {
            "dayOfWeek": "MONDAY",
            "numberOfDay": 12
        },
        {
            "dayOfWeek": "TUESDAY",
            "numberOfDay": 16
        },
        {
            "dayOfWeek": "WEDNESDAY",
            "numberOfDay": 16
        },
        {
            "dayOfWeek": "THURSDAY",
            "numberOfDay": 15
        },
        {
            "dayOfWeek": "FRIDAY",
            "numberOfDay": 16
        }
    ],
    "times": [
        {
            "startTime": "10:00",
            "endTime": "11:00"
        },
        {
            "startTime": "11:00",
            "endTime": "12:00"
        },
        {
            "startTime": "12:00",
            "endTime": "13:00"
        },
        {
            "startTime": "13:00",
            "endTime": "14:00"
        },
        {
            "startTime": "14:00",
            "endTime": "15:00"
        }
    ],
    "slots": [
        [
            {
                "id": "9ca8165d-920e-41ad-b184-78b23790858f",
                "startTime": "11:00",
                "endTime": "12:00",
                "maxCapacity": 27,
                "capacity": 0,
                "status": "",
                "students": [
                    {
                        "id": "f3305341-e0ac-4333-a426-28d07dbd612b",
                        "fullName": "Federico Dominguez",
                        "status": "ATTENDANCE"
                    },
                    {
                        "id": "f3305341-e0ac-4333-a426-28d07dbd612b",
                        "fullName": "Federico Dominguez",
                        "status": "ATTENDANCE"
                    },
                    {
                        "id": "f3305341-e0ac-4333-a426-28d07dbd612b",
                        "fullName": "Federico Dominguez",
                        "status": "ATTENDANCE"
                    },
                    {
                        "id": "f3305341-e0ac-4333-a426-28d07dbd612b",
                        "fullName": "Federico Dominguez",
                        "status": "ATTENDANCE"
                    },
                    {
                        "id": "f3305341-e0ac-4333-a426-28d07dbd612b",
                        "fullName": "Federico Dominguez",
                        "status": "ATTENDANCE"
                    }, {
                        "id": "f3305341-e0ac-4333-a426-28d07dbd612b",
                        "fullName": "Federico Dominguez",
                        "status": "ATTENDANCE"
                    }
                ]
            },
            null,
            null
        ],
        [
            {
                "id": "482ef2fd-820e-44f9-8720-2219bb863d91",
                "startTime": "12:00",
                "endTime": "13:00",
                "maxCapacity": 27,
                "capacity": 0,
                "status": "FINALIZED",
                "students": []
            },
            null,
            null
        ],
        [
            {
                "id": "d1272572-ab36-4be3-9f98-866cfcec4605",
                "startTime": "13:00",
                "endTime": "14:00",
                "maxCapacity": 27,
                "capacity": 0,
                "status": "FINALIZED",
                "students": []
            },
            {
                "id": "e52fb282-40da-41ff-9ead-2ef7292de446",
                "startTime": "13:00",
                "endTime": "14:00",
                "maxCapacity": 27,
                "capacity": 0,
                "status": "FINALIZED",
                "students": []
            },
            null
        ],
        [
            null,
            {
                "id": "00edb510-2b51-4a70-974b-f52cb4b7dc0a",
                "startTime": "14:00",
                "endTime": "15:00",
                "maxCapacity": 27,
                "capacity": 27,
                "status": "IN_PROGRESS",
                "students": [
                    {
                        "id": "f3305341-e0ac-4333-a426-28d07dbd612b",
                        "fullName": "Federico Dominguez",
                        "status": "ATTENDANCE"
                    },
                    {
                        "id": "f3305341-e0ac-4333-a426-28d07dbd612b",
                        "fullName": "Federico Dominguez",
                        "status": "ATTENDANCE"
                    },
                    {
                        "id": "f3305341-e0ac-4333-a426-28d07dbd612b",
                        "fullName": "Federico Dominguez",
                        "status": "ATTENDANCE"
                    },
                    {
                        "id": "f3305341-e0ac-4333-a426-28d07dbd612b",
                        "fullName": "Federico Dominguez",
                        "status": "ATTENDANCE"
                    },
                    {
                        "id": "f3305341-e0ac-4333-a426-28d07dbd612b",
                        "fullName": "Federico Dominguez",
                        "status": "ATTENDANCE"
                    }
                ]
            },
            null
        ],
        [
            null,
            null,
            {
                "id": "28fbcba4-2518-4268-901f-7cdc7a17d27b",
                "startTime": "10:00",
                "endTime": "11:00",
                "maxCapacity": 27,
                "capacity": 1,
                "status": "FINALIZED",
                "students": [
                    {
                        "id": "f3305341-e0ac-4333-a426-28d07dbd612b",
                        "fullName": "Federico Dominguez",
                        "status": "ATTENDANCE"
                    },
                    {
                        "id": "f3305341-e0ac-4333-a426-28d07dbd612b",
                        "fullName": "Federico Dominguez",
                        "status": "ATTENDANCE"
                    },
                    {
                        "id": "f3305341-e0ac-4333-a426-28d07dbd612b",
                        "fullName": "Federico Dominguez",
                        "status": "ATTENDANCE"
                    },
                    {
                        "id": "f3305341-e0ac-4333-a426-28d07dbd612b",
                        "fullName": "Federico Dominguez",
                        "status": "ATTENDANCE"
                    }

                ]
            }
        ]
    ]
}