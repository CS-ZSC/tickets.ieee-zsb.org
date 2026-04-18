import axios from "axios";
import api from "./index";

export interface TicketUser {
  id: number;
  name: string;
  email: string;
}

export interface TicketEvent {
  id: number;
  name: string;
  slug: string;
  location: string;
  start_date: string;
  end_date: string;
  status: string;
}

export interface VerifiedTicket {
  user: TicketUser;
  event: TicketEvent;
  role: string;
  ticket_status: string;
}

export interface VerifySuccess {
  success: true;
  message: string;
  data: VerifiedTicket;
}

export interface VerifyFailure {
  success: false;
  message: string;
  status?: number;
}

function extractMessage(error: unknown, fallback: string): string {
  if (!axios.isAxiosError(error)) return fallback;
  const data = error.response?.data;
  if (data?.errors) {
    const first = Object.values(data.errors)[0] as string[] | undefined;
    if (first?.[0]) return first[0];
  }
  return data?.message || fallback;
}

export async function verifyTicket(
  qrCode: string,
): Promise<VerifySuccess | VerifyFailure> {
  try {
    const res = await api.post("/eventsgate/tickets/verify", {
      qr_code: qrCode,
    });
    const d = res.data?.data;
    if (!d?.user || !d?.event) {
      return {
        success: false,
        message: res.data?.message || "Invalid ticket.",
      };
    }
    return {
      success: true,
      message: res.data?.message || "Ticket verified",
      data: {
        user: {
          id: d.user.id,
          name: d.user.name,
          email: d.user.email,
        },
        event: {
          id: d.event.id,
          name: d.event.name,
          slug: d.event.slug,
          location: d.event.location,
          start_date: d.event.start_date,
          end_date: d.event.end_date,
          status: d.event.status,
        },
        role: d.role,
        ticket_status: d.ticket_status,
      },
    };
  } catch (error) {
    const status = axios.isAxiosError(error)
      ? error.response?.status
      : undefined;
    return {
      success: false,
      status,
      message: extractMessage(error, "Ticket could not be verified."),
    };
  }
}

export interface CheckInSuccess {
  success: true;
  message: string;
}

export async function checkInTicket(
  qrCode: string,
): Promise<CheckInSuccess | VerifyFailure> {
  try {
    const res = await api.post("/eventsgate/tickets/check-in", {
      qr_code: qrCode,
    });
    return {
      success: true,
      message: res.data?.message || "Checked in successfully",
    };
  } catch (error) {
    const status = axios.isAxiosError(error)
      ? error.response?.status
      : undefined;
    return {
      success: false,
      status,
      message: extractMessage(error, "Check-in failed."),
    };
  }
}
